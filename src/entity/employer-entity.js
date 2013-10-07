
var EmployerEntity = function(fields) {
	var employer = EmployerManager.create(fields);
	employer.entity = this;
	this.employer = employer;

	this.postedJobs = new JobList();
};

EmployerEntity.prototype.postJob = function(fields) {
	var employer = this.employer;

	fields["employer"] = employer; // Add the employer field

	var job = JobManager.create(fields);
	var postedJobs = this.postedJobs;
	postedJobs.add(job);
	return job;
};

EmployerEntity.prototype.listJobs = function() {
	return this.postedJobs;
};

var JobFilter = function(fields) {
	this.fields = fields;
	/*
	if ("date" in fields) {
		this.date = fields["date"];
	}
	if ("job" in fields) {
		this.job = fields["job"];
	}
	*/
};

/*
Classes:

	SearchByDate
	SearchByJob
	SearchByDateAndJob

*/	

EmployerEntity.prototype.listJobApplications = function(jobFilter) { // Need to a JobSeeker to apply for a job <-- JobApplication
	var allApplications = JobApplicationManager.getList();

	// TODO: jobFiltering!

	return allApplications;
};
