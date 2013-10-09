var EmployerEntity = function(fields) {
	var employer = EmployerManager.create(fields);
	employer.entity = this;
	this.employer = employer;

};

EmployerEntity.prototype.postJob = function(fields) {
	var employer = this.employer;

	fields["employer"] = employer; // Add the employer field

	var job = JobManager.create(fields);

	var postedJobs = employer.get("postedJobs");
	var jobs = postedJobs.get("jobs");

	jobs.add(job); // Should we instead do: postedJobs.add(job)?

	return job;
};

EmployerEntity.prototype.listJobs = function() { // Should we return jobs or PostedJobs?
	var employer = this.employer;
	var postedJobs = employer.get("postedJobs");
	var jobs = postedJobs.get("jobs");
	return jobs;
};

// If we use a specific JobApplicationDate, then the filter it's not as reusable for other queries!

var JobFilter = function(fields) {
	for (var prop in fields) {
		if (fields.hasOwnProperty(prop)) {
			this[prop] = fields[prop];
		}
	}
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
