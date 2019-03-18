
// Following the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
      // AMD. Register as an anonymous module.
      define([], function () {
          return (root.returnExportsGlobal = factory());
      });
  } else if (typeof module === 'object' && module.exports) {
      // Node. Does not work with strict CommonJS, but
      // only CommonJS-like environments that support module.exports,
      // like Node.
      module.exports = factory();
  } else {
      // Browser globals
      root.returnExportsGlobal = factory();
  }
}(typeof self !== 'undefined' ? self : this, function () {
  function TableLayoutSelection(opts) {
    opts = opts ? opts : {};
    this.options = opts;
    this.containerSelector = opts.containerSelector;
    this.rows = Math.floor(opts.rows) || 6;
    this.cols = Math.floor(opts.cols) || 6;
  }

  TableLayoutSelection.prototype = {
    render: function() {

    }
  };

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return TableLayoutSelection;
}));