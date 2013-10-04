//--------------------------------------------------------------
//
// Model: JobApplication
//
//--------------------------------------------------------------

var JobApplicationDate = Model.extend({
});


var JobApplication = Model.extend({
	default: {
		date: null
	  , job: null
	}
  , initialize: function(fields) {
		var fieldList = ["job", "applicationDate"];
		this.checkMissingFields("JobApplication", fields, fieldList);

		this.set("job", fields["job"]);
		this.set("date", fields["applicationDate"]);
	}
});

var JobApplicationFactory = {
	create: function(fields) {
		var application = new JobApplication(fields);
		return application;
	}
};

// ------------------------------------------------------------

/*
var JobApplication = Model.extend({
	default: {
		requester: null
	  , request: null
	}
});
*/

// ------------------------------------------------------------