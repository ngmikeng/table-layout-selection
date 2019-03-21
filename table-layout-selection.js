// Following the UMD template https://github.com/umdjs/umd/blob/master/templates/returnExportsGlobal.js
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], function() {
      return (root.MnTableLayoutSelection = factory());
    });
  } else if (typeof module === 'object' && module.exports) {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals
    root.MnTableLayoutSelection = factory();
  }
}(typeof self !== 'undefined' ? self : this, function() {
  function TableLayoutSelection(opts) {
    opts = opts ? opts : {};
    this.options = opts;
    this.containerSelector = opts.containerSelector;
    this.rows = Math.floor(opts.rows) || 6;
    this.cols = Math.floor(opts.cols) || 6;
  }

  TableLayoutSelection.prototype = {
    render: function() {
      var containerElement = document.querySelector(this.containerSelector);
      var maxRow = this.rows;
      var maxCol = this.cols;
      for (var rowIndex = 1; rowIndex <= maxRow; rowIndex++) {
        var rowData = [];
        var rowEle = document.createElement('div');
        rowEle.setAttribute('class', 'tls--table-row');
        for (var colIndex = 1; colIndex <= maxCol; colIndex++) {
          var colData = {
            label: colIndex + ' x ' + rowIndex,
            row: rowIndex,
            col: colIndex
          };
          rowData.push(colData);
          var cellEle = document.createElement('div');
          cellEle.setAttribute('class', 'tls--table-col');
          cellEle.setAttribute('data-row', colData.row);
          cellEle.setAttribute('data-col', colData.col);
          cellEle.setAttribute('data-label', colData.label);

          // bind events
          this.bindMouseoverEvents(cellEle, this.eventMouseoverHandler);

          rowEle.appendChild(cellEle);
        }
        containerElement.appendChild(rowEle);
      }
    },

    bindMouseoverEvents: function(element, callbackHandler) {
      if (element) {
        element.addEventListener('mouseover', function(event) {
          var dataset = event.target.dataset;
          if (typeof callbackHandler === 'function') {
            callbackHandler(dataset);
          }
        });
      }
    },

    eventMouseoverHandler: function(data) {
      if (data) {
        var cells = document.querySelectorAll('.tls--table-col');
        var rowVal = data.row * 1;
        var colVal = data.col * 1;
        cells.forEach(function(cell) {
          if (cell && cell.dataset) {
            var cellRow = cell.dataset.row * 1;
            var cellCol = cell.dataset.col * 1;
            if (cellRow <= rowVal && cellCol <= colVal) {
              cell.style.borderColor = 'blue';
            } else {
              cell.style.borderColor = '#ddd';
            }
          }
        });
      }
    }
  };

  // Just return a value to define the module export.
  // This example returns an object, but the module
  // can return a function as the exported value.
  return TableLayoutSelection;
}));
