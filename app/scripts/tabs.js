(function (scope, DOM, Panels, STATE) {

  function TabPanel(node) {
    var panel = DOM.findFirst('#' + node.href.split('#')[1]);

    function showPanel() {
      DOM.toggleClass(node.parentNode, STATE.ACTIVE, true);
      DOM.toggleClass(panel, STATE.ACTIVE, true);
    }

    function hidePanel() {
      DOM.toggleClass(node.parentNode, STATE.ACTIVE, false);
      DOM.toggleClass(panel, STATE.ACTIVE, false);
    }

    DOM.on(node, 'click', function (e) {
      e.preventDefault();
      showPanel();
    });

    return {
      show: showPanel,
      hide: hidePanel
    }
  }

  function Tabs(selector) {
    var root = DOM.findFirst(selector);
    var panelTogglers = DOM.find(selector + ' a');
    var panels = Panels(panelTogglers, TabPanel);

    function showFirstTabIfNoneSelected() {
      var activeTabs = DOM.find('.' + STATE.ACTIVE, root).length;

      if (activeTabs === 1) {
        return;
      }

      panels.show(0);
    }

    showFirstTabIfNoneSelected();

    return panels;
  }

  scope.Tabs = Tabs;

})(window, DOM, Panels, STATE);
