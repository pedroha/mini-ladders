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

var createJobApplication = function(seeker, job, resume, applicationDate) {
	if (!applicationDate) {
		throw new Error("createJobApplication(): Missing applicationDate");
	}
	var jobApplication = JobApplicationManager.create({
	    jobSeeker: 		 seeker
	  , applicationDate: applicationDate
	  , job: job
	  , resume: resume
	});
	return jobApplication;	
};

var JobApplicationHandlerByStatus = {
	"success": function(seeker, job, resume, applicationDate, appliedJobs) {
		var application = createJobApplication(seeker, job, resume, applicationDate);
		appliedJobs.add(application);
		return application;
	}
  , "failed": function(seeker, job, resume, applicationDate, appliedJobs) {
		// Log onto some place!
		// Log into the JobApplication Error (should that be the same JobApplicationManager? )
		var title = job.getTitle();
		console.log("JREQ not PASSED for: " + title.get("value"));
	}
};

var applyForJob = function(reportType, seeker, job, resume, applicationDate, appliedJobs) {
	var status = Validator[reportType].isJobApplicationValid(job, resume);
	var handlerByStatus = JobApplicationHandlerByStatus[status];
	return handlerByStatus(seeker, job, resume, applicationDate, appliedJobs);
};

JobSeekerEntity.prototype.applyForJob = function(applicationDate, job, resume) {
	var jobType = job.get("type").get("value");

	if (!(jobType in {"ATS": 0, "JREQ": 0})) {
		var msg = "JobSeekerEntity.applyForJob(): validator for JOB_TYPE('" + jobType + "'), not found.";
		throw new Error(msg);
	}
	var jobApplication = applyForJob(jobType, this.seeker, job, resume, applicationDate, this.appliedJobs);	
	return jobApplication;
};


JobSeekerEntity.prototype.savedJob = function(job) {
	var savedJobs = this.savedJobs;
	savedJobs.add(job);
};

JobSeekerEntity.prototype.listSavedJobs = function() {
	return this.savedJobs;
};

JobSeekerEntity.prototype.listAppliedJobApplications = function() {
	return this.appliedJobs;
};

