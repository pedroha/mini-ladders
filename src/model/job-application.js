//--------------------------------------------------------------
//
// Model: JobApplication
//
//--------------------------------------------------------------

var createDate = function(year, month, day) {
	// month is 1-based, day is 1-based (no zero based indexing for these)
  	assert( ("" + year).length == 4, "DateModel(), missing year, month, day");
  	var month = (month < 10) ? "0" + month : month;
  	var day = (day < 10)? "0" + day : day;
  	var str = "" + year + month + day;
  	var momented = moment(str, "YYYYMMDD");	
  	return momented;
  	// return str;
};


var DateModel = Model.extend({	// All internal dates using moment() API
	default: {
		value: null
	}
  , initialize: function(year, month, day) {
  	/*
  		console.log(">>>>>>>>>>>>")
  		for (var i = 0; i < arguments.length; i++) {
  			console.log( JSON.stringify(arguments[i] ));
  		}
  		console.log(">>>>>>>>>>>>")

	  	var date = createDate(year, month, day);

	  	this.set("value", date);
	  	*/
	}
});

var SeekingAction = Model.extend({
	default: {
		date: null
	  , seeker: null
	}
  , initialize: function(fields) {
		var fieldList = ["applicationDate", "jobSeeker"];
		this.checkMissingFields("SeekingAction", fields, fieldList);

		this.set("seeker", fields["jobSeeker"]);
		this.set("date", fields["applicationDate"]);
	}
});

var JobApplicationDate = Model.extend({
});


var JobApplication = Model.extend({
	default: {
		seeking: null
	  , job: null
	}
  , initialize: function(fields) {
		var fieldList = ["job", "applicationDate", "jobSeeker"];
		this.checkMissingFields("JobApplication", fields, fieldList);

		var seeking = new SeekingAction(fields);
		this.set("seeking", seeking);
		this.set("job", fields["job"]);
	}
  , getApplicationDate: function() {
  		var seeking = this.get("seeking");
  		var date = seeking.get("date");
  		return date;
	}
  , getJob: function() {
  		var job = this.get("job");
  		return job;
	}
  , getEmployer: function() {
  		var job = this.get("job");
  		var employer = job.get("employer");
  		return employer;
	}
  , getJobSeeker: function() {
  		var seeking = this.get("seeking");
  		var seeker = seeking.get("seeker");
  		return seeker;
	}
});

var JobApplicationFactory = {
	create: function(fields) {
		var application = new JobApplication(fields);
		return application;
	}
};
