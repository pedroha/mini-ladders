var ReportType = function(type) {
    this.type = type;
};

var REPORT_TYPE = {
    'CSV': new ReportType('CSV')
  , 'HTML': new ReportType('HTML')
};


var TableDelimiterStrategy = {
    'CSV': {
        preCell:    function() { return '\"'; }
      , postCell:   function() { return '\"'; }
      , postBetweenCell:   function() { return ','; }
      , preRow:     function() { return ''; }
      , postRow:    function() { return '\n'; }
      , preTable:   function() { return ''; }
      , postTable:  function() { return ''; }
    }
  , 'HTML': {
        preCell:    function() { return '<td>'; }
      , postBetweenCell:   function() { return ''; }
      , postCell:   function() { return '</td>'; }
      , preRow:     function() { return '<tr>'; }
      , postRow:    function() { return '</tr>'; }
      , preTable:   function() { return '<table>'; }
      , postTable:  function() { return '</table>'; }
    }
};

var TableReportBuilder = (function() {

    var buildCell = function(row, col, data, delimiter) {
        var cellContent = data.get(row, col);
        var isLast = (col+1 == data.getNumCols());
        var last = (isLast)? "" : delimiter.postBetweenCell();
        delimitedCell = delimiter.preCell() + cellContent + delimiter.postCell() + last;
        return delimitedCell;
    };

    var buildRow = function(row, cols, data, delimiter) {
        var rowContent = '';
        for (var j = 0; j < cols; j++) {
            rowContent += buildCell(row, j, data, delimiter);
        }
        var delimitedRow = delimiter.preRow() + rowContent + delimiter.postRow();
        return delimitedRow;
    };

    var buildRows = function(rows, cols, data, delimiter) {
        var content = '';
        for (var i = 0; i < rows; i++) {
            var rowContent = buildRow(i, cols, data, delimiter);
            content += rowContent;
        }
        var delimitedContent = delimiter.preTable() + content + delimiter.postTable();
        return delimitedContent;
    }

    var buildReport = function(data, delimiter) {
        var rows = data.getNumRows();
        var cols = data.getNumCols();
        var content = buildRows(rows, cols, data, delimiter);
        return 'CSV: ' + content;
    };

    return {
        build: buildReport
    }
})();
