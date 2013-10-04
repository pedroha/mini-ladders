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
        return delimiter.preRow() + rowContent + delimiter.postRow();
    };

    var buildRows = function(rows, cols, data, delimiter) {
        var content = '';
        for (var i = 0; i < rows; i++) {
            var rowContent = buildRow(i, cols, data, delimiter);
            content += rowContent;
        }
        return delimiter.preTable() + content + delimiter.postTable();
    };

    var buildReport = function(data, delimiter) {
        var rows = data.getNumRows();
        var cols = data.getNumCols();
        var content = buildRows(rows, cols, data, delimiter);
        return content;
    };

    return {
        build: buildReport
    }
})();
