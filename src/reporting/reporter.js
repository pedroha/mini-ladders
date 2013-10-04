/*
    var adapterClass = ReportTabularAdapter;

    var content = Reporter.createReport(appliedJobs, adapterClass, REPORT_TYPE.CSV);
    alert(content);
*/

function createAdapter(constructor) {
    var factoryFunction = constructor.bind.apply(constructor, arguments);
    return new factoryFunction();
}

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
    this.getColumn = function(item, column) {
        if (column == 0) {
        }
        var content = item.get('job').get('title').get('value');
        return content;
    };
};

var Reporter = (function() {
    var getFormatter = function(reportType) {
        return Formatter[reportType.type];
    };

    var createReport = function(collection, adapterClass, format) {
        var rowAdapter = new JobApplicationRowAdapter();
        var delimiter = TableDelimiterStrategy["CSV"];
        var adapter = createAdapter(adapterClass, collection, rowAdapter);
        var formatter = getFormatter(format);
        var content = formatter.format(adapter, delimiter);
        return content;
    };

    return {
        createReport: function(collection, adapterClass, format) {
            return createReport(collection, adapterClass, format);
        }
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