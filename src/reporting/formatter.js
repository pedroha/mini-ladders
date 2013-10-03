var TabularReport = function() {
  this.getNumColumns = function() {}
  this.getNumRows = function() {}
  this.sortByColumn = function(j) {}
  this.getCell = function(i, j) {}
};

var Report = {
  CSVFormatter: {
    formatReport: function() {
    }
  },
  HTMLFormatter = {
    formatReport: function() {
    }
  } 
}


var createJobApplicationReport = function(jobFilter, reportType) {
  // aggregate job application numbers by job and employer
  // jobseeker, job, employer, job application date

  var collection = listJobApplications(jobFilter);

  var rowAccessor = "Strategy to convert object fields into tabular row accessor";

  var tabularReport = createTabularReport(collection, rowAccessor);

  // tabularReport.sort() ?

  var formatter = getFormatter(reportType);
  return formatter.format(tabularReport);
}