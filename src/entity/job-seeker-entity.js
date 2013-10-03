var JobSeekerEntity = function(fields) {
	var seeker = JobSeekerManager.create(fields);
	seeker.entity = this;

	this.seeker = seeker;

	this.savedJobs = new JobList();
	this.appliedJobs = new JobApplicationList();
};


var Validator = {
	"ATS": {
		isJobApplicationValid: function(job, resume) {
			return true;
		}		
	}
  , "JREQ": {
		isJobApplicationValid: function(job, resume) {
			var valid = (!!resume);
			return valid;
		}		
	}
};


JobSeekerEntity.prototype.applyForJob = function(job, resume) {
	var jobType = job.get("type").get("value");

	var valid = Validator[jobType].isJobApplicationValid(job, resume);

	if (valid) {
		var fields = {
			job: job
		  , applicationDate: new JobApplicationDate()
		  , resume: resume
		};
		var application = JobApplicationManager.create(fields); // Rules: IF ATS do something
		var appliedJobs = this.appliedJobs;
		appliedJobs.add(application);

		return application;		
	}
	else {
		// TODO:
		// Log into the JobApplication Error (should that be the same JobApplicationManager? )
	}
};
