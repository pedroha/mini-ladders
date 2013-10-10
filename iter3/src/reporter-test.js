var columnHeader = {
	"title": "Job Title"
};

var formatter = new LogFormatter(columnHeader);
var reportBuilder = new ReportBuilder(formatter);

var createJob = JobFactory.create;

// Test title.reportOn()
if (0) {
	var title = new JobTitle({title: "Front-End Developer"});
	title.reportOn(reportBuilder);	
}

// Test jobList.reportOn()
if (0) {

	// Part of Employer (easier to query for all his/her posted jobs)
	var jobList = JobList();

	jobList.add(createJob({title: "Front-End Developer"}));
	jobList.add(createJob({title: "Back-End Developer"}));
	jobList.add(createJob({title: "Mobile Developer"}));

	jobList.reportOn(reportBuilder);	
}

// Test postedJobs.reportOn()
if (0) {
	var postedJobs = new PostedJobs();

	postedJobs.add(createJob({title: "Front-End Developer"}));
	postedJobs.add(createJob({title: "Back-End Developer"}));
	postedJobs.add(createJob({title: "Mobile Developer"}));

	postedJobs.reportOn(reportBuilder);	
}

/////////////////////////////////
// EMPLOYER.LIST_JOBS

// Test Employer.postedJobs.reportOn()
if (1) {
	// var ibm = new Employer({name: "ibm"});
	var ibm = EmployerFactory.create({name: "ibm"});

	ibm.postJob(createJob({title: "Front-End Developer"}));
	ibm.postJob(createJob({title: "Back-End Developer"}));
	ibm.postJob(createJob({title: "Mobile Developer"}));

	ibm.reportOn(reportBuilder);	
}


if (1) {
	var fields = {
		'applicationDate': 	new JobApplicationDate({year: 2013, month: 10, day: 2})
	  , 'employer': 		new StringWrapper2({value2: "IBM Corp."})
	  , 'seeker': 			new StringWrapper3({value3: "John Doe"})
	  , 'title': 			new StringWrapper4({value4: "VP of Development"})
	};

	var application = new JobApplication(fields);

	application.reportOn(reportBuilder);	
}

