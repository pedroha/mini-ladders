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
		title: null
	},
	initialize: function(fields) {
		this.checkMissingFields("Job", fields, ["value"]);
		this.set("value", fields["value"]);
	}
});
