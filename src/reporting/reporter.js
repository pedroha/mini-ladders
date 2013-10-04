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
