// Employer.PostedJobs depends on Jobs

var CompanyName = Model.extend({
	defaults: {
		name: null,
	}
  , initialize: function(fields) {
 		this.checkMissingFields("CompanyName", fields, ["name"]);
	}
});

var PostedJobs = Model.extend({
	defaults: {
		jobs: null
	}
  , initialize: function() {
  		this.set("jobs", new JobList());
	}
  , add: function(job) {
  		var jobs = this.get("jobs");
  		jobs.add(job);
	}
  , reportOn: function(reportBuilder) {  		
  		var jobs = this.get("jobs");
  		jobs.reportOn(reportBuilder);
	}
});


var Employer = Model.extend({
	defaults: {
		name: null
	  , postedJobs: null
	}
  , initialize: function(fields) { // fields: need to pass the Fully built objects in Backbone!
 		this.checkMissingFields("Employer", fields, ["name", "postedJobs"]);
	}
  , reportOn: function(reportBuilder) {  		
  		var jobs = this.listJobs();
		jobs.reportOn(reportBuilder);
	}
  , postJob: function(job) {
  		var jobs = this.listJobs();
  		jobs.add(job);
	}
  , listJobs: function() {
  		var jobs = this.get("postedJobs");
  		return jobs;
	}
});

var EmployerList = Collection.extend({ // Utility collection
	model: Employer
});

// ?

var Employers = function() { // First class collection
	var employees = new EmployerList();
};

var EmployerFactory = new function() {
	var employers = [];

	var createEmployer = function(name) {
		var jobs = new PostedJobs();
		var employer = new Employer({
			name: name			
		  , postedJobs: jobs
		});
		return employer;
	};

	var create = function(fields) {
		Model.prototype.checkMissingFields("EmployerFactory.create()", fields, ["name"]);

		var name = new CompanyName({name: fields["name"]});
		var employer = createEmployer(name);
		employers.push(employer);
		return employer;
	};

	var list = function() {
		return employers;
	};

	var api = {
		create: create
	  , list: list
	};
	return api;
};
