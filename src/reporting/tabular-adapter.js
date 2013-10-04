var ReportTabularAdapter = function(collection, rowAdapter) {
    this.getNumRows = function() {
        return collection.length;
    };
    this.getNumCols = function(){
        return 4;
    };
    this.get = function(i, j) {
        var row = collection.at(i);
        var item = rowAdapter.getColumn(row, j);
        return item;
    };
};

var JobApplicationRowAdapter = function() {
    var dataFn = {
        "null": function(item) {
            return "null";
        }
      , "0": function(item) {
            // Employer
            return item.get('job').get('title').get('value'); 
        }
      , "1": function(item) {
            // Date ------------------------
            var date = item.get('date');
            var display = date.format("YYYY-MM-DD");
            return display;
        }
      , "2": function(item) {
            // Job Title ------------------------
            var title = item.get('job').get('title');
            var display = title.get('value');
            return display;
        }
      , "3": function(item) {
            // JobSeeker
            return item.get('job').get('title').get('value'); 
        }
    };
    
    this.getColumn = function(item, column) {
        var col = "" + column; // stringify the column
        var content = dataFn[col](item);
        return content;
    };
};
