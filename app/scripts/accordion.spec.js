describe('Accordion Panels', function () {
  var $sandbox;
  var accordionSelector = '#accordion';
  var accordionTabIds = ['accordion1', 'accordion2', 'accordion3'];

  beforeEach(function () {
    $('body').append('<div id="sandbox"></div>');
    $sandbox = $('#sandbox');

    $sandbox.append('<div id="accordion"></div>');

    accordionTabIds.forEach(function (id) {
      var $panel = $('<div></div>').appendTo(accordionSelector);
      $panel.append('<div><h4><a href="#' +id+ '">' + id+ '</a></h4></div><div id="' + id + '">body for ' + id + '</a></div>');
    })
  });

  afterEach(function () {
    $('#sandbox').remove()
  });

  it('should toggle accordion', function () {
    var accordion = Accordion(accordionSelector);

    expect($sandbox.find('h4 a.collapsed').length).toEqual(accordionTabIds.length);
    expect($sandbox.find('div.in').length).toEqual(0);

    var toggler = $sandbox.find('h4:last a')[0];

    expect(toggler.className).toEqual('collapsed');
    DOM.trigger(toggler, 'click');

    expect(toggler.className).toEqual('');
    expect($sandbox.find('#accordion3')[0].className).toEqual('in');
  });

});

