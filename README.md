Table Layout Selection
===

# Quick Start
- Add files js and css to your index.html `table-layout-selection.js` and `table-layout-selection.css`.
- Available options:

```
var opts = {
  containerSelector: '#my-table',
  rows: 5,
  cols: 5,
  onCellClick: function(data) {
    console.log(data);
  }
};
var tableSelection = new MnTableLayoutSelection(opts);
tableSelection.render();
```
# Options
- **containerSelector (string)**: element's selector to render
- **rows (number)**: number of rows
- **cols (number)**: number of columns
- **onCellClick (function)**: callback handle click on table cell.
