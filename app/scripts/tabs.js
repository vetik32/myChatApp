(function (scope, DOM, Panels, STATE) {

  function TabPanel(node, index) {
    var panel = DOM.findFirst('#' + node.href.split('#')[1]);

    function isSelected () {
      return DOM.hasClass(node.parentNode, STATE.ACTIVE) && DOM.hasClass(panel, STATE.ACTIVE);
    }

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
      DOM.triggerCustom(node, 'select', index);
    });

    return {
      show: showPanel,
      hide: hidePanel,
      isActive: function () {
        return isSelected();
      }
    }
  }

  function Tabs(selector) {
    var root = DOM.findFirst(selector);
    var panelTogglers = DOM.find(selector + ' a');
    var tabs = Panels(panelTogglers, TabPanel, root);

    function showFirstTabIfNoneSelected() {
      var activeTabs = DOM.find('.' + STATE.ACTIVE, root).length;

      if (activeTabs === 1) {
        return;
      }

      tabs.show(0);
    }

    showFirstTabIfNoneSelected();

    return {
      show: tabs.show,
      onSelect: tabs.onSelect,
      isActive: function (index) {
        return tabs.panels[index].isActive()
      }
    };
  }

  scope.Tabs = Tabs;

})(window, DOM, Panels, STATE);
