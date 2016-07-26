describe('DOM', function () {

  var node;

  beforeEach(function () {
    $('body').append('<div id="test" class="a b c">zzz</div>');
    node = DOM.findFirst('#test');
  });

  afterEach(function () {
    $('#test').remove()
  });

  it('should remove className', function () {
    DOM.toggleClass(node, 'a');
    expect(node.className).toEqual('b c');
  });

  it('should add className', function () {
    DOM.toggleClass(node, 'z');
    expect(node.className).toEqual('a b c z');
  });

  it('should add className', function () {
    DOM.toggleClass(node, 'q', true);
    expect(node.className).toEqual('a b c q');
  });

  it('should remove className', function () {
    DOM.toggleClass(node, 'b', false);
    expect(node.className).toEqual('a c');
  });

  it('should keep className', function () {
    DOM.toggleClass(node, 'b', true);
    expect(node.className).toEqual('a b c');
  });

  it('should ignore removing className', function () {
    DOM.toggleClass(node, 'q', false);
    expect(node.className).toEqual('a b c');
  });
});
