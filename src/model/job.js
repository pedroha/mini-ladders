//--------------------------------------------------------------
//
// Model: Job
//
//--------------------------------------------------------------

var Job = Model.extend({
	default: {
		requirement: null
	  , employer: null
	},
	initialize: function(fields) {
		this.checkMissingFields("Job", fields, ["title", "type", "employer"]);

		var requirement = new JobRequirement(fields);
		this.set("requirement", requirement);
		this.set("employer", fields["employer"]);
	}
  , getTitle: function() {
		var requirement = this.get("requirement");
  		var title = requirement.get("title");
  		return title;
	}
});

var JobList = Collection.extend({
	model: Job
});

var JobFactory = {
	create: function(fields) {
		var job = new Job(fields);
		return job;
	}
};

var JobManager = {
	jobList: new JobList()

  , create: function(fields) {
		var job = JobFactory.create(fields);
		var list = this.jobList;
		list.add(job);
		return job;
	}
  , getList: function() {
		return this.jobList;
	}
};
