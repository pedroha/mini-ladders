//--------------------------------------------------------------
//
// Model: Job
//
//--------------------------------------------------------------

var Job = MyModel.extend({
	default: {
		type: null
	  , title: null
	},
	initialize: function(fields) {
		this.checkMissingFields("Job", fields, ["title", "type"]);
		var title = new JobTitle({value: fields.title});
		this.set("title", title);
		this.set("type", fields["type"]);
	}
});

var JobList = Backbone.Collection.extend({
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
