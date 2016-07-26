(function (scope, DOM) {

  var ACTIVE = 'active';

  function Tab(node) {
    var panel = DOM.findFirst('#' + node.href.split('#')[1]);

    function showTab() {
      DOM.toggleClass(node.parentNode, ACTIVE, true);
      DOM.toggleClass(panel, ACTIVE, true);
    }

    function hideTab() {
      DOM.toggleClass(node.parentNode, ACTIVE, false);
      DOM.toggleClass(panel, ACTIVE, false);
    }

    DOM.on(node, 'click', function (e) {
      e.preventDefault();
      showTab();
    });

    return {
      show: showTab,
      hide: hideTab
    }
  }

  function Tabs(selector) {
    var root = DOM.findFirst(selector);
    var links = DOM.find(selector + ' a');
    var tabs = [];


    function closeAllTabs() {
      var activeTab = DOM.findFirst('.' + ACTIVE, root);

      DOM.toggleClass(activeTab, ACTIVE, false);

      _.forEach(tabs, function (tab) {
        tab.hide();
      })
    }

    _.each(links, function (anchor) {
      DOM.on(anchor, 'click', closeAllTabs);
      tabs.push(Tab(anchor));
    });

    var hasActiveTabDefined = DOM.findFirst('.' + ACTIVE, root);

    if (!hasActiveTabDefined) {
      closeAllTabs();
      tabs[0].show();
    }
  }

  scope.Tabs = Tabs;

})(window, DOM);
