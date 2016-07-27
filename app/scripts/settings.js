(function(scope, DOM){

  var SETTINGS = {
    USER_NAME: 'userName',
    IMAGE_WIDTH: 'imageWidth',
    IMAGE_HEIGHT: 'imageHeight'
  };

  function Settings() {
    var defaultSettings = {
      serverIp: 'http://185.13.90.140:8081',
      userName: 'anonymous',
      imageWidth: 400,
      imageHeight: 200
    };

    _.each(DOM.find('#settings .form-control'), function(node){
      var defaultValue = defaultSettings[node.id];
      if (!defaultValue) {
        return
      }

      node.value = defaultValue;
    });
    function getSetting(settingName) {
      var inputName = DOM.findFirst('#' + settingName);

      if (!inputName) {
        return defaultSettings[settingName]
      }

      return inputName.value || defaultSettings[settingName];
    }

    return {
      getUserName: function () {
        return getSetting(SETTINGS.USER_NAME);
      },
      getSocketIP: function () {
        return defaultSettings.serverIp;
      },
      getImageSize: function () {
        return {
          width: getSetting(SETTINGS.IMAGE_WIDTH),
          height: getSetting(SETTINGS.IMAGE_HEIGHT)
        }
      }
    }
  }

  scope.Settings = Settings();
})(window, DOM);