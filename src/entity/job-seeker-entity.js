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


var JobApplicationHandler = {
	"ATS": {
		handle: function(application, appliedJobs) {
			appliedJobs.add(application);
		}
	}
  , "JREQ": {
  		handle: function(application, appliedJobs) {
  			if (!application.get("resume")) {
  				// Log onto some place!
  			}
  			else {
				appliedJobs.add(application);
			}
  		}
 	}
};

// Deferred will work so well here: Deferred.then(success, fail); ? Is this cheating ??

JobSeekerEntity.prototype.applyForJob = function(job, resume) {
	var jobApplication = JobApplicationManager.create({
	    jobSeekerId:     this.seeker.get("cid")
	  , applicationDate: new JobApplicationDate()
	  , job: job
	  , resume: resume
	});
	var jobType = job.get("type").get("value");
	var handler = JobApplicationHandler[jobType];
	var deferred = handler.handle(jobApplication, this.appliedJobs);
	return deferred;
};

/*
	var jobType = job.get("type").get("value");
	// alert(jobType);

	var validator = Validator[jobType];

	if (validator) {
		var valid = validator.isJobApplicationValid(job, resume);

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
		else { // TODO: no ELSE  !!!!!
			// TODO:
			// Log into the JobApplication Error (should that be the same JobApplicationManager? )
		}
	}
	// NO ELSE !!!
	else {
		var msg = "JobSeekerEntity.applyForJob(): validator for JOB_TYPE('" + jobType + "'), not found.";
		throw new Error(msg);
	}
*/
