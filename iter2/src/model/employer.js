//--------------------------------------------------------------
//
// Model: Employer
//
//--------------------------------------------------------------

var PostedJobs = Model.extend({
	defaults: {
		jobs: null
	}
  , initialize: function() {
  		this.set("jobs", new JobList());
	}
});

var ReportBuilder = function() {

	var properties = ["ApplicationDate", "CompanyName", "JobTitle", "JobSeekerName"];

	// Each relevant model will have a unique "reportPropertyName"

	var buildReport = function(model) {		
	};
};

// Our "Collection" can contain a generic buildReport that traverses through each item.

var CompanyName = Model.extend({
	defaults: {
		value: null
	}
  , initialize: function(fields) {
		this.checkMissingFields("CompanyName", fields, ["name"]);
		this.set("value", fields.name);
	}
  , buildReport: function(reportBuilder) {
  		var reportPropertyName = "CompanyName";

  		var name = this.get("value");
  		reportBuilder.add("name", name);
	}
});

var Employer = Model.extend({
	default: {
		name: null
	  , postedJobs: null
	},
	initialize: function(fields) {
		this.checkMissingFields("Employer", fields, ["name"]);
		
		var name = new CompanyName({name: fields.name});
		var jobs = new PostedJobs();

		this.set("name", name);
		this.set("postedJobs", jobs);
	}
});

var EmployerList = Collection.extend({
	model: Employer
});

var EmployerFactory = {
	create: function(fields) {
		var employer = new Employer(fields);
		return employer;
	}
};

var EmployerManager = {
	employerList: new EmployerList()

  , create: function(fields) {
		var employer = EmployerFactory.create(fields);
		var list = this.employerList;
		list.add(employer);
		return employer;
	}
  , getList: function() {
		return this.employerList;
	}
};