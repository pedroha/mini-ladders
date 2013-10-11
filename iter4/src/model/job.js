var JobTitle = Model.extend({
	defaults: {
		title: null
	  , reportProperty: 'title'
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
