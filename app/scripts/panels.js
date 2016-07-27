(function (scope, DOM) {
  function Panels(togglers, Panel, root) {
    var panels = [];
    var onSelectHandler = function(){};

    function closeAll() {
      _.forEach(panels, function (panel) {
        panel.hide();
      })
    }

    function subscribeToSelectEvent(toggler) {
      if (!root) {
        return
      }
      DOM.on(toggler, 'select', function (e) {
        onSelectHandler(e.detail);
      })
    }

    _.each(togglers, function (toggler, index) {
      DOM.on(toggler, 'click', closeAll);
      subscribeToSelectEvent(toggler);
      panels.push(Panel(toggler, index));
    });

    return {
      onSelect: function (handler) {
        onSelectHandler = handler
      },
      closeAll: closeAll,
      show: function (index) {
        closeAll();
        panels[index].show()
      },
      panels: panels
    }
  }

  scope.Panels = Panels;

})(window, DOM);
