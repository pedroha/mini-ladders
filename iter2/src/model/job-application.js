//--------------------------------------------------------------
//
// Model: JobApplication
//
//--------------------------------------------------------------

// DateModel is more reusable than JobApplicationDate but not a very semantic class

var JobApplicationDate = Model.extend({
	default: {
		date: null
	}
  , initialize: function(fields) {
		var fieldList = ["year", "month", "day"];
		this.checkMissingFields("JobApplicationDate", fields, fieldList);

		var year	= fields["year"];
		var month	= fields["month"];
		var day		= fields["day"];

  		var date = new DateModel(year, month, day);
  		this.set("date", date);
	}
  , equals: function(otherDate) {
  		var date = this.get("date");
  		var same = date.equals(otherDate);
  		return same;
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
		this.set("applicationDate", fields["applicationDate"]);
	}
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
  		var date = seeking.get("applicationDate");
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
