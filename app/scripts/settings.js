(function(scope, DOM){

  function Settings() {
    var userName = '';

    return {
      getUserName: function () {
        var inputName = DOM.findFirst('#name');

        if (inputName.value) {
          userName = inputName.value;
        } else {
          userName = 'anonymous';
        }

        return userName;
      },
      getSocketIP: function () {
        return 'http://185.13.90.140:8081'
      }
    }
  }

  scope.Settings = Settings();
})(window, DOM);