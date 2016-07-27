describe("Missing Message Badge", function () {
  var $sandbox;
  var accordionSelector = '#accordion';
  var accordionTabIds = ['accordion1', 'accordion2', 'accordion3'];
  var instance;
  var $el;

  beforeEach(function () {
    $('body').append('<div id="sandbox"></div>');
    $sandbox = $('#sandbox');

    $sandbox.append('<span id="badge"></span>');
    $el = $('#badge');
    instance = MissingMessageCounter('#badge');
  });

  afterEach(function () {
    $('#sandbox').remove();
  });

  it("should be empty at beginning", function () {
    expect($el.html()).toEqual('');
  });

  it("should be updated", function () {
    instance.increment();
    expect($el.html()).toEqual('1');

    instance.increment();
    expect($el.html()).toEqual('2');

    instance.reset();
    expect($el.html()).toEqual('');
  });
});