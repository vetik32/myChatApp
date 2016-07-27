(function (scope, DOM, Panels) {

  var STATE_IN = 'in';
  var STATE_COLLAPSED = 'collapsed';

  function AccordionPanel(toggler) {
    var panel = DOM.findFirst('#' + toggler.href.split('#')[1]);

    
    function shouldBeCollapsed() {
      return DOM.hasClass(toggler, STATE_COLLAPSED) || !DOM.hasClass(panel, STATE_IN) ;
    }

    function isCollapsed() {
      return DOM.hasClass(toggler, STATE_COLLAPSED) && !DOM.hasClass(panel, STATE_IN) ;
    }

    if (shouldBeCollapsed()) {
      hidePanel();
    }

    function showPanel() {
      DOM.toggleClass(panel, STATE_IN, true);
      DOM.toggleClass(toggler, STATE_COLLAPSED, false);
    }

    function hidePanel() {
      if (isCollapsed()) {
        return;
      }

      DOM.toggleClass(panel, STATE_IN, false);
      DOM.toggleClass(toggler, STATE_COLLAPSED, true);
    }

    DOM.on(toggler, 'click', function (e) {
      e.preventDefault();
      showPanel();
    });

    return {
      show: showPanel,
      hide: hidePanel,
      isActive: function () {
        return !isCollapsed();
      }
    }
  }

  function Accordion(selector) {
    var root = DOM.findFirst(selector);
    var panelTogglers = DOM.find('h4 a', root);
    return Panels(panelTogglers, AccordionPanel);
  }

  scope.Accordion = Accordion;

})(window, DOM, Panels);
