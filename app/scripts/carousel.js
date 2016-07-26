(function (scope, DOM) {
  function Carousel(selector) {
    //var cache = Cache();
    var index = 0;

    var container = DOM.findFirst(selector);
    var prevButton = DOM.findFirst('.glyphicon-chevron-left', container);
    var nextButton = DOM.findFirst('.glyphicon-chevron-right', container);

    function showNextImage() {
      console.log('show next:', ++index);
    }

    function showPrevImage() {
      if (index === 0) {
        console.log('no previous images');
        return;
      }
      console.log('show previous:', --index);
    }

    DOM.on(prevButton, 'click', showPrevImage);
    DOM.on(nextButton, 'click', showNextImage);
  }

  scope.Carousel = Carousel;

})(window, DOM);
