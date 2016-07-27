(function (Settings, IO, DOM, Carousel, Tabs, Accordion) {
  var tabs = Tabs('#navigationTabs');
  var accordion = Accordion('#accordion');
  var carousel = Carousel('#loremCarousel');
  var socket = IO.connect(Settings.getSocketIP());
  var sendMessage = DOM.findFirst('#message'),
    allPostsArea = DOM.findFirst('#allPosts'),
    sendButton = DOM.findFirst('#send');

  tabs.show(2);
  accordion.show(1);

  function buildMessage(msg) {
    return {
      message: msg,
      user: Settings.getUserName()
    }

  }

  function getMessageMarkup(data) {
    if (!data.user) {
      return '<div class="message-system">' + data.message + '</div>';
    }

    var message = '';
    var messageType = '';

    if (data.user === Settings.getUserName()) {
      messageType = 'local';
      message = data.message
    } else if (data.user === 'echoBot2000') {
      messageType = 'system';
      message = data.user + ': ' + data.message;
    } else {
      messageType = 'remote';
      message = data.user + ': ' + data.message;
    }

    return '<div class="message-' + messageType + '">' + message + '</div>';
  }

  //SOCKET STUFF
  socket.on('message', function (data) {
    var copy = DOM.getHtml(allPostsArea);
    var chatMsg = getMessageMarkup(data);

    DOM.setHtml(allPostsArea, copy + chatMsg);
    DOM.scrollTo(DOM.findLast('div', allPostsArea));
  });

  DOM.on(sendButton, 'click', function (e) {
    if (sendMessage.value.length) {
      socket.emit('message', buildMessage(sendMessage.value));
      sendMessage.value = '';
    }
  });

  DOM.on(sendMessage, 'keydown', function (e) {
    if (e.keyCode === 13) {
      DOM.trigger(sendButton, 'click');
    }
  });

})(Settings, io, DOM, Carousel, Tabs, Accordion);
