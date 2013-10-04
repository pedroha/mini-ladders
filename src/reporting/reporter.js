/*
    var adapterClass = ReportTabularAdapter;

    var content = Reporter.createReport(appliedJobs, adapterClass, REPORT_TYPE.CSV);
    alert(content);
*/

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
            var title = item.get('job').get('title');
            var display = title.get('value');
            return display;
        }
      , "1": function(item) {
            var date = item.get('date');
            var display = date.format("YYYY-MM-DD");
            return display;
        }
      , "2": function(item) {
            return item.get('job').get('title').get('value'); 
        }
      , "3": function(item) {
            return item.get('job').get('title').get('value'); 
        }
    };
    
    this.getColumn = function(item, column) {
        var col = "" + column; // stringify the column
        var content = dataFn[col](item);
        return content;
    };
};

var Reporter = (function() {
    var createAdapter = function(constructor) {
        var factoryFunction = constructor.bind.apply(constructor, arguments);
        return new factoryFunction();
    };

    var createReport = function(collection, adapterClass, reportType) {
        var rowAdapter = new JobApplicationRowAdapter();
        var delimiter = TableDelimiterStrategy[reportType.value];
        var adapter = createAdapter(adapterClass, collection, rowAdapter);
        var content = TableReportBuilder.build(adapter, delimiter);
        return content;
    };

    return {
        createReport: createReport
    };
})();

// http://tobyho.com/2010/11/22/javascript-constructors-and/
// http://stackoverflow.com/questions/3362471/how-can-i-call-a-javascript-constructor-using-call-or-apply

// Basic HashMap using an Object?: http://jsfiddle.net/bs95m/

/*
function Name(name) {
    this.name = name;
}

function callConstructor(constructor) {
    var factoryFunction = constructor.bind.apply(constructor, arguments);
    return new factoryFunction();
}

var John = callConstructor(Name, 'Juan');

*/
