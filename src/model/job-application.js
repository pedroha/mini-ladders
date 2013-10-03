//--------------------------------------------------------------
//
// Model: JobApplication
//
//--------------------------------------------------------------

var JobApplicationDate = MyModel.extend({
});


var JobApplication = MyModel.extend({
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

