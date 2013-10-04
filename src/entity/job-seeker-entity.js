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
			return "success";
		}		
	}
  , "JREQ": {
		isJobApplicationValid: function(job, resume) {
			var status = "failed";
			var valid = (!!resume);
			if (valid) {
				status = "success";
			}
			return status;
		}
	}
};

var createJobApplication = function(seeker, job, resume) {
	// TODO: investigate // BUG in Backbone? NOT WORKING?
	// var date = new JobApplicationDate(2013, 10, 5); 
	var date = createDate(2013, 10, 5);

	var jobApplication = JobApplicationManager.create({
	    jobSeekerId:     seeker.get("cid")		// creating circular reference if not using Id
	  , applicationDate: date
	  , job: job
	  , resume: resume
	});
	return jobApplication;	
};

var JobApplicationHandlerByStatus = {
	"success": function(seeker, job, resume, appliedJobs) {
		var application = createJobApplication(seeker, job, resume);
		appliedJobs.add(application);
	}
  , "failed": function(seeker, job, resume, appliedJobs) {
		// Log onto some place!
		// Log into the JobApplication Error (should that be the same JobApplicationManager? )
		console.log("JREQ not PASSED for: " + job.get("title").get("value"));	
	}
};

var getJobApplicationHandler = function(reportType, seeker, job, resume, appliedJobs) {
	var handler = function() {
		var status = Validator[reportType].isJobApplicationValid(job, resume);
		var handlerByStatus = JobApplicationHandlerByStatus[status];
		handlerByStatus(seeker, job, resume, appliedJobs);
	};
	return handler;
};

JobSeekerEntity.prototype.applyForJob = function(job, resume) {
//	var jobApplication = createJobApplication(job, resume);
	var jobType = job.get("type").get("value");
	if (!(jobType in {"ATS": 0, "JREQ": 0})) {
		var msg = "JobSeekerEntity.applyForJob(): validator for JOB_TYPE('" + jobType + "'), not found.";
		throw new Error(msg);
	}
	var handler = getJobApplicationHandler(jobType, this.seeker, job, resume, this.appliedJobs);;
	handler(this.seeker, job, resume, this.appliedJobs);
};
