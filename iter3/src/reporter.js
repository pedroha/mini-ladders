var Collection = Backbone.Collection.extend({
	reportOn: function(reportBuilder) {
		if (!reportBuilder) throw new Error("Collection.reportOn(): missing reportBuilder");

		var items = this;
		items.each(function(item) {
			item.reportOn(reportBuilder);
		});
	}
});

var Model = Backbone.Model.extend({

	checkMissingFields: function(className, fields, fieldList) {
		var checkForObject = function() {
			if (!_.isObject(fields)) {
				throw new Error("Model(): passing a primitive instead of a hash map of attributes");
			}			
		};

		var checkForMissingField = function(field) {
			if (!(field in fields)) {
			 	throw new Error(className + "(): missing '" + field + "' property!");
			}
		};

		var checkForMissingFields = function() {
			for (var i = 0; i < fieldList.length; i++) {
				var field = fieldList[i];
				checkForMissingField(field);
			}			
		};

		checkForObject();
		checkForMissingFields();
	}
  , equals: function(other) {
  		// Too strong: equal references (not by values)
  		// TODO: for value objects (by value content), some day...
  		var same = (this === other);
  		return same;
	}
  , reportOn: function(reportBuilder) {
		if (!reportBuilder) throw new Error("Model.buildReport(): missing reportBuilder");
		var self = this;

		// This applies for a Primitive, when an object has a single Property
		// (not when we have multiple primitives, but in our exercise, we never have such scenarios)

		var createField = function(propertyName) {
			var value = self.get(propertyName);
			var obj = {};
			obj[propertyName] = value;
			return obj;
		};

		var propertyName = this.get('reportFieldProperty');
		//alert("Property name: " + propertyName);
		if (propertyName) {
			var obj = createField(propertyName);
			reportBuilder.display(obj);
		}
	}
  , reportOnList: function(reportBuilder, items) {
		items.each(function(item) {
			item.reportOn(reportBuilder);
		});
	}
});

// --------------------------------------------------

var CompanyName = Model.extend({
	defaults: {
		name: null,
	}
  , initialize: function(fields) {
 		this.checkMissingFields("CompanyName", fields, ["name"]);
	}
});


// The way it works in Backbone (some fields get initialized if we pass the 
// the whole "large" extra super-field object) ---> not a great idea in Backbone (taking more storage that's unused)
//
// Simplicity: field same as the class wrapper

var JobTitle = Model.extend({
	defaults: {
		title: null
	  , reportFieldProperty: 'title'
	}
  , initialize: function(fields) {
 		this.checkMissingFields("JobTitle", fields, ["title"]);	
	}
});


var Job = Model.extend({	// Copy of JobTitle
	defaults: {
		title: null
	}
  , initialize: function(fields) {
 		this.checkMissingFields("Job", fields, ["title"]);
	}
  , reportOn: function(reportBuilder) {
		if (!reportBuilder) throw new Error("Model.reportOn(): missing reportBuilder");

		var title = this.get("title");		// Could be generalized? at the Model.
		title.reportOn(reportBuilder);
	}
});

var JobList = Collection.extend({
	model: Job
});

var JobFactory = (function() {
	var jobs = [];

	var createJobTitle = function(title) {
		var title = new JobTitle({
			title: title
		});
		return title;
	};

	var createJob = function(jobTitle) {
		var job = new Job({
			title: jobTitle
		});
		return job;
	};

	var create = function(fields) {
		Model.prototype.checkMissingFields("JobFactory.create()", fields, ["title"]);

		var jobTitle = createJobTitle(fields["title"]);
		var job = createJob(jobTitle);
		jobs.push(job);
		return job;
	};

	var list = function() {
		return jobs;
	};

	return {
		create: create
	  , list: list
	};
})();

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

var StringWrapper = Model.extend({
});

var JobApplication = Model.extend({
	initialize: function(fields) {
		this.checkMissingFields("JobApplication", fields,
			["applicationDate", "employer", "title", "seeker"]
		);
	}
  , reportOn: function(reportBuilder) {
  		var items = [];
  		items.push(this.get("employer"));
  		items.push(this.get("applicationDate"));
  		items.push(this.get("seeker"));
  		items.push(this.get("title"));

  		this.reportOnList(reportBuilder, items);
	}
});

var JobApplicationList = Collection.extend({ // contained by the JobSeeker.appliedJobApplications
	model: JobApplication
});

var JobApplicationFactory = new function() {

	var create = function() {

	};

	var list = function() {

	};

	var api = {
		create: create
	  , list: list
	};
	return api;
};
