(function (scope, DOM, Settings) {

  var IMAGE_LIMIT_MIN = 1;
  var IMAGE_LIMIT_MAX = 10;

  function Carousel(selector) {
    var index = IMAGE_LIMIT_MIN;
    var container = DOM.findFirst(selector);
    var imagePlaceholder = DOM.findFirst('#imagePlaceholder');
    var prevButton = DOM.findFirst('.glyphicon-chevron-left', container);
    var nextButton = DOM.findFirst('.glyphicon-chevron-right', container);

    var imageSize = Settings.getImageSize();

    DOM.setStyle(imagePlaceholder, {
      'min-width': imageSize.width + 'px',
      'min-height': imageSize.height + 'px'
    });

    function prefetch(url) {
      var img = DOM.create('img');
      img.onload = function () {
        DOM.toggleClass(container, 'loading', false);
        DOM.triggerCustom(container, 'loaded');
      };
      img.src = url;
    }

    function fetchImage() {
      var imageSize = Settings.getImageSize();

      var url = 'http://lorempixel.com/' + imageSize.width + '/' + imageSize.height + '/sports/' + index;

      DOM.toggleClass(container, 'loading', true);
      prefetch(url);
      imagePlaceholder.src = url;
    }

    function showNextImage() {
      if (index === IMAGE_LIMIT_MAX) {
        return;
      }

      index += 1;
      fetchImage();
    }

    function showPrevImage() {
      if (index === IMAGE_LIMIT_MIN) {
        return;
      }

      index -= 1;
      fetchImage();
    }

    fetchImage();

    function showCarousel() {
      DOM.toggleClass(container.parentNode, 'initialising', false);
      DOM.off(container, 'loaded', showCarousel);
    }

    DOM.on(container, 'loaded', showCarousel);
    DOM.on(prevButton, 'click', showPrevImage);
    DOM.on(nextButton, 'click', showNextImage);
  }

  scope.Carousel = Carousel;

})(window, DOM, Settings);
