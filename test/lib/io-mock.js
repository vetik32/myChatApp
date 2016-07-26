(function (scope) {

  function MockIO() {
    return {
      on: function () {

      },
      emit: function () {

      }
    }
  }

  scope.io = MockIO;
})(window);
