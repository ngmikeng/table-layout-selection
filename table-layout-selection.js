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
  function TableCell(rowIndex, colIndex, opts) {
    opts = opts ? opts : {};
    this.rowIndex = Math.floor(rowIndex) || 1;
    this.colIndex = Math.floor(colIndex) || 1;
  }

  /**
   * Main class
   */
  function TableLayoutSelection(opts) {
    opts = opts ? opts : {};
    this.options = opts;
    this.containerSelector = opts.containerSelector;
    this.containerElement = document.querySelector(this.containerSelector);
    if (!this.containerElement) {
      throw new Error('Not found container element');
    }
    this.rows = Math.floor(opts.rows) || 6;
    this.cols = Math.floor(opts.cols) || 6;
    this.styles = {
      cellBorderColorDefault: opts.cellBorderColorDefault || '#ddd',
      cellBorderColorHover: opts.cellBorderColorHover || 'blue'
    };
    this.events = {
      onCellClick: opts.onCellClick
    }
  }

  TableLayoutSelection.prototype = {
    render: function() {
      var self = this;
      var maxRow = this.rows;
      var maxCol = this.cols;
      var tableEle = document.createElement('div');
      tableEle.setAttribute('class', 'tls--container');
      for (var rowIndex = 1; rowIndex <= maxRow; rowIndex++) {
        var rowEle = document.createElement('div');
        rowEle.setAttribute('class', 'tls--table-row');
        for (var colIndex = 1; colIndex <= maxCol; colIndex++) {
          // create a table cell
          var tableCell = new TableCell(rowIndex, colIndex);
          var cellEle = document.createElement('div');
          cellEle.setAttribute('class', 'tls--table-col');
          cellEle.setAttribute('data-row', tableCell.rowIndex);
          cellEle.setAttribute('data-col', tableCell.colIndex);

          // bind events
          this.bindMouseoverEvent(cellEle, function(dataSet) {
            self.eventMouseoverHandler(dataSet);
          });
          this.bindCellClickEvent(cellEle, function(dataSet) {
            if (typeof self.events.onCellClick === 'function') {
              self.events.onCellClick(new TableCell(dataSet.row, dataSet.col));
            }
          });

          rowEle.appendChild(cellEle);
        }
        tableEle.appendChild(rowEle);
      }
      // create footer info
      var footerEle = document.createElement('div');
      footerEle.setAttribute('class', 'tls--table-footer');
      footerEle.style.width = this.containerElement.width;
      tableEle.appendChild(footerEle)

      this.containerElement.appendChild(tableEle);
    },

    bindMouseoverEvent: function(element, callbackHandler) {
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
        var self = this;
        var cells = this.containerElement.querySelectorAll('.tls--table-col');
        var rowVal = data.row * 1;
        var colVal = data.col * 1;
        cells.forEach(function(cell) {
          if (cell && cell.dataset) {
            var cellRow = cell.dataset.row * 1;
            var cellCol = cell.dataset.col * 1;
            if (cellRow <= rowVal && cellCol <= colVal) {
              cell.style.borderColor = self.styles.cellBorderColorHover;
              var footerELe = self.containerElement.querySelector('.tls--table-footer');
              footerELe.innerHTML = '<span>' + cellRow + ' x ' + cellCol + '</span>';
            } else {
              cell.style.borderColor = self.styles.cellBorderColorDefault;
            }
          }
        });
      }
    },

    bindCellClickEvent: function(cellElement, callbackHandler) {
      if (cellElement) {
        cellElement.addEventListener('click', function(event) {
          var dataset = event.target.dataset;
          if (typeof callbackHandler === 'function') {
            callbackHandler(dataset);
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
