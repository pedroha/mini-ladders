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
    this.isLastColumn = function(col) {
        var isLast = (col+1 == this.getNumCols());
        return isLast;
    };
};

var JobApplicationValueAdapter = {
    "applicationDate": function(item) {
        var applicationDate = item.getApplicationDate();
        var date = applicationDate.get("date");
        var display = date.format("YYYY-MM-DD");
        return display;
    }
  , "companyName": function(item) {
        var employer = item.getEmployer();
        var name = employer.get("name");
        var display = name.get('value');
        return display;
    }
  , "jobTitle": function(item) {
        var job = item.getJob();
        var title = job.getTitle();
        var display = title.get("value");
        return display;
    }
  , "seekerName": function(item) {
        var seeker = item.get('jobSeeker');
        var name = seeker.get("name");
        var display = name.getFullName();
        return display;
    }
};

var JobApplicationRowAdapter = function() {
    var indexMapping = {
        "0": "companyName"
      , "1": "applicationDate"
      , "2": "jobTitle"
      , "3": "seekerName"
    };

    var valueAdapterFn = function(field, item) {
        var value = JobApplicationValueAdapter[field](item);
        return value;
    };

    var dataFn = {};
    for (var idx in indexMapping) {
        if (indexMapping.hasOwnProperty(idx)) {
            var value = indexMapping[idx];
            dataFn[idx] = valueAdapterFn.bind(null, value);
        }
    }

    this.getColumn = function(item, column) {
        var col = "" + column; // stringify the column
        var content = dataFn[col](item);
        return content;
    };
};
