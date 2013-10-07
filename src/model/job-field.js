var JobType = Model.extend({
	default: {
		value: null
	},
	initialize: function(fields) {
		this.checkMissingFields("JobType", fields, ["value"]);
		this.set("value", fields["value"]);
	},
	isJobApplicationValid: function(job, resume) {
		return false;
	} 
});

var JOB_TYPE = {
  ATS:  new JobType({value: "ATS"})
, JREQ: new JobType({value: "JREQ"})
};

var JobTitle = Model.extend({
	default: {
		value: null
	},
	initialize: function(fields) {
		this.checkMissingFields("Job", fields, ["value"]);
		this.set("value", fields["value"]);
	}
});

var JobRequirement = Model.extend({
	default: {
		jobType: null
	  , title: ''
	},
	initialize: function(fields) {
		this.checkMissingFields("JobRequirement", fields, ["type", "title"]);

		var title = new JobTitle({value: fields.title});
		this.set("type", fields["type"]);
		this.set("title", title);
	}
});
