// Employer.PostedJobs depends on Jobs

var CompanyName = Model.extend({
	defaults: {
		name: null,
		reportProperty: 'name'
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

var shows = function(fieldName) {
	var parts = fieldName.split('.');

};


var Employer = Model.extend({
	defaults: {
		name: null
	  , postedJobs: null
	}
  , initialize: function(fields) { // fields: need to pass the Fully built objects in Backbone!
 		this.checkMissingFields("Employer", fields, ["name", "postedJobs"]);
	}
  , reportOn: function(reportBuilder) {

	  	// Report on Name OR report on PostedJobs ? (probably not both)

  		if (reportBuilder.shows('Employer.name')) {
  			var name = this.get('name');
  			name.reportOn(reportBuilder);
  		}

  		if (reportBuilder.shows('Employer.postedJobs')) {
	  		var jobs = this.listJobs();
			jobs.reportOn(reportBuilder);
  		}
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

// Question: Should we use a Collection wrapper: Employers() to contain EmployerList?
// Not a Backbone pattern

// var Employers = function(employers) {
// 	this.employers = new EmployerList(employers);
// };

var EmployerList = Collection.extend({ // Utility collection
	model: Employer
});

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
