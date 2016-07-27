(function (scope, DOM) {
  function Panels(togglers, Panel) {
    var panels = [];

    function closeAll() {
      _.forEach(panels, function (panel) {
        panel.hide();
      })
    }

    _.each(togglers, function (toggler) {
      DOM.on(toggler, 'click', closeAll);
      panels.push(Panel(toggler));
    });

    return {
      closeAll: closeAll,
      show: function (index) {
        closeAll();
        panels[index].show()
      }
    }
  }

  scope.Panels = Panels;

})(window, DOM);
