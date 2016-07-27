(function (Settings, IO, DOM, Carousel, Tabs, Accordion, chatInstance, MissingMessageCounter) {
  var tabs = Tabs('#navigationTabs');
  var accordion = Accordion('#accordion');
  var carousel = Carousel('#loremCarousel');
  var socket = IO.connect(Settings.getSocketIP());
  var sendMessage = DOM.findFirst('#message');

  var sendButton = DOM.findFirst('#send');
  var CHAT_TAB_INDEX = 0;
  var missingMessageCounter = MissingMessageCounter('#missingMessagesId');

  accordion.show(1);

  function buildMessage(msg) {
    return {
      message: msg,
      user: Settings.getUserName()
    }

  }

  socket.on('message', function (message) {
    chatInstance.showMessage(message);

    if (!tabs.isActive(CHAT_TAB_INDEX)) {
      missingMessageCounter.increment();
    }
  });

  tabs.onSelect(function(selectedTabIndex){
    if (selectedTabIndex === CHAT_TAB_INDEX) {
      missingMessageCounter.reset();
      chatInstance.scrollToLastMessage();
    }
  });

  DOM.on(sendButton, 'click', function (e) {
    if (sendMessage.value.length) {
      var message = buildMessage(sendMessage.value);
      socket.emit('message', message);
      chatInstance.showMessage(message);
      sendMessage.value = '';
    }
  });

  DOM.on(sendMessage, 'keydown', function (e) {
    if (e.keyCode === 13) {
      DOM.trigger(sendButton, 'click');
    }
  });

})(Settings, io, DOM, Carousel, Tabs, Accordion, Chat, MissingMessageCounter);
