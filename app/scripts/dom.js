(function (scope) {
  scope.DOM = {
    find: function (selector, context) {
      return (context || document).querySelectorAll(selector);
    },
    findFirst: function(selector, context) {
      return this.find(selector, context)[0];
    },
    findLast: function(selector, context) {
      var nodes = this.find(selector, context);

      return nodes[nodes.length - 1];
    },
    on: function (node, type, listener) {
      node.addEventListener(type, listener)
    },
    trigger: function (elem, type) {
      var event = new Event(type);

      elem.dispatchEvent(event);
    },
    getHtml: function (node) {
      return node.innerHTML;
    },
    setHtml: function (node, html) {
      node.innerHTML = html;
    },
    scrollTo: function(node) {
      if (!node) {
        return;
      }

      node.scrollIntoView();
    },
    hasClass: function (node, className) {
      if (!node) {
        return false;
      }
      var classes = node.className ? node.className.split(' ') : [];

      return classes.indexOf(className) > -1;
    },
    toggleClass: function (node, className, add) {
      if (!node) {
        return;
      }

      var classes = node.className ? node.className.split(' ') : [];
      var classIndex  = classes.indexOf(className);
      var hasClassName  = classIndex > -1;
      var removeClass = false;

      if (add === true && hasClassName || add === false && !hasClassName) {
        return;
      }

      if (hasClassName || add === false) {
        removeClass = true;
      }

      if (removeClass) {
        classes.splice(classIndex, 1)
      } else {
        classes.push(className);
      }

      node.className = classes.join(' ');
    }
  };
})(window);
