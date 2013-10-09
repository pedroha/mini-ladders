
var LogFormatter = function(columnHeader) {

	var addProperty = function(key, value, target) {
		if (key in columnHeader) {
			key = columnHeader[key];
		}
		target[key] = value;
	};

	var remapKeysToColumnHeader = function(source, target) {
		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				addProperty(key, source[key], target);
			}
		}
	};

	this.display = function() {
		var args = Array.prototype.slice.call(arguments, 0);

		var source = args[0][0];
		var target = {};

		remapKeysToColumnHeader(source, target);

		var display = JSON.stringify(target);
		console.log("===> " + display);
	};
};

var ReportBuilder = function(formatter) {
	formatter = formatter || new LogFormatter();

	this.display = function(data) {
		var args = [].slice.call(arguments, 0);
		formatter.display(args);
	};
};

var ReportFormatter = function(outputFormat, columnFieldMapping) {
	this.outputFormat = outputFormat;

	this.display = function(data) {
		var data = JSON.stringify(data);
		console.log(data);
	};
};

/*

NEED: JobApplicationList to Filter through and display different fields

var CSVFormatter = (function() {
	var display = function() {

	};

	return {
		display: display
	}
})();
*/

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


/// NEXT: Formatters: 



/*

// NEXT: PostedJobs that contains a JobList
// One thing at a ti

// Test Employer.reportOn() NOT as useful as: JobApplications.reportOn(reportBuilder);
// Filter: JobApplications.filter()
//			JobsAppications.

JobApplications.create = function() {
};

JobApplications.list = function() { // list all JobApplications that have been created!
};


var JobApplication = Model.extend({ // Report on: JobApplicationDate, Employer Name, Job Seeker Name, 
	defaults: {

	}
  , initialize: function() {

	}
});


if (1) {
	// -> JobList? not as useful
}

*/