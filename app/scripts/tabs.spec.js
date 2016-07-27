describe('Tab Panels', function () {
  var $sandbox;
  var tabIds = ['tab1', 'tab2', 'tab3'];

  beforeEach(function () {
    $('body').append('<div id="sandbox"></div>');
    $sandbox = $('#sandbox');

    $sandbox.append('<ul id="nav"></ul>');

    tabIds.forEach(function (id) {
      $('#nav').append('<li><a href="#' + id + '">' + id + '</a></li>');
      $sandbox.append('<div id="' + id + '">body for ' + id + '</a></div>');
    })
  });

  afterEach(function () {
    //$('#sandbox').remove()
  });

  it('should have one active panel', function () {
    var tabs = Tabs('#nav');

    expect($sandbox.find('ul li:first')[0].className).toEqual('active');
    expect($sandbox.find('#tab1')[0].className).toEqual('active');
  });

  it('should switch tab', function () {
    var tabs = Tabs('#nav');
    var lastTab = $sandbox.find('ul li:last a')[0];

    DOM.trigger(lastTab, 'click');

    expect($sandbox.find('ul li:first')[0].className).toEqual('');
    expect($sandbox.find('#tab1')[0].className).toEqual('');

    expect($sandbox.find('ul li:last')[0].className).toEqual('active');
    expect($sandbox.find('#tab3')[0].className).toEqual('active');

  });
});