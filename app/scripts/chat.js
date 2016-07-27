(function (scope, DOM) {
  var USER_BOT = 'echoBot2000';
  var allPostsArea = DOM.findFirst('#allPosts');

  function getMessageMarkup(data) {
    if (!data.user) {
      return '<div class="message-system">' + data.message + '</div>';
    }

    var message = '';
    var messageType = '';

    if (data.user === Settings.getUserName()) {
      messageType = 'local';
      message = data.message
    } else if (data.user === USER_BOT) {
      messageType = 'system';
      message = data.user + ': ' + data.message;
    } else {
      messageType = 'remote';
      message = data.user + ': ' + data.message;
    }

    return '<div class="message-' + messageType + '">' + message + '</div>';
  }

  function scrollToLastMessage() {
    DOM.scrollTo(DOM.findLast('div', allPostsArea));
  }
  function Chat() {
    return {
      showMessage: function (data) {
        var copy = DOM.getHtml(allPostsArea);
        var chatMsg = getMessageMarkup(data);

        DOM.setHtml(allPostsArea, copy + chatMsg);
        scrollToLastMessage();
      },
      scrollToLastMessage: scrollToLastMessage
    }
  }

  scope.Chat = Chat();
})(window, DOM);
