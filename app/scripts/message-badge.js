(function (scope, DOM) {

  function MissingMessageCounter(selector) {

    var missingMessages = DOM.findFirst(selector);

    var missingMessagesCount = 0;
    return {
      increment: function () {
        DOM.setHtml(missingMessages, ++missingMessagesCount);

      },
      reset: function () {
        DOM.setHtml(missingMessages, '');
        missingMessagesCount = 0;
      }
    }
  }

  scope.MissingMessageCounter = MissingMessageCounter;

})(window, DOM);
