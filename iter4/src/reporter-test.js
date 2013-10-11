var columnHeaders = {
	"applicationDate": "Application Date"
  , "value2": "Company Name"
  , "value3": "Job Seeker"
  , "value4": "Job Title"
  , "title" : "JOB TITLE"
};

var properties = new ReportColumnProperties(
	["applicationDate", "value2", "value3", "value4"]
);

var formatter = new LogFormatter(columnHeaders);
var reportBuilder = new ReportBuilder(formatter, properties);

var createJob = JobFactory.create;

// Test title.reportOn()
if (0) {
	var title = new JobTitle({title: "Front-End Developer"});
	title.reportOn(reportBuilder);	
}

// Test jobList.reportOn()
if (0) {
	var formatter = new LogFormatter(columnHeaders);
	var reportBuilder = new ReportBuilder(formatter, new ReportColumnProperties(["title"]));

	// Part of Employer (easier to query for all his/her posted jobs)
	var jobList = JobList();

	jobList.add(createJob({title: "Front-End Developer"}));
	jobList.add(createJob({title: "Back-End Developer"}));
	jobList.add(createJob({title: "Mobile Developer"}));

	jobList.reportOn(reportBuilder);	
}

// Test postedJobs.reportOn()
if (0) {
	var formatter = new LogFormatter(columnHeaders);
	var reportBuilder = new ReportBuilder(formatter, new ReportColumnProperties(["title"]));

	var postedJobs = new PostedJobs();

	postedJobs.add(createJob({title: "Front-End Developer"}));
	postedJobs.add(createJob({title: "Back-End Developer"}));
	postedJobs.add(createJob({title: "Mobile Developer"}));

	postedJobs.reportOn(reportBuilder);	
}

/////////////////////////////////
// EMPLOYER.LIST_JOBS

// Test Employer.postedJobs.reportOn()
if (0) {
	var formatter = new LogFormatter(columnHeaders);
	var reportBuilder = new ReportBuilder(formatter, new ReportColumnProperties(["title"]));

	// var ibm = new Employer({name: "ibm"});
	var ibm = EmployerFactory.create({name: "ibm"});

	ibm.postJob(createJob({title: "Front-End Developer"}));
	ibm.postJob(createJob({title: "Back-End Developer"}));
	ibm.postJob(createJob({title: "Mobile Developer"}));

	ibm.reportOn(reportBuilder);
}


if (0) {
	// Test JobApplicationList.reportOn() with Dummy wrappers and distinct reportProperty

	var formatter = new LogFormatter(columnHeaders);
	var reportBuilder = new ReportBuilder(formatter, properties);

	var fields = {
		'applicationDate': 	new JobApplicationDate({year: 2013, month: 10, day: 2})
	  , 'employer': 		new StringWrapper2({value2: "IBM Corp."})
	  , 'seeker': 			new StringWrapper3({value3: "John Doe"})
	  , 'title': 			new StringWrapper4({value4: "VP of Development"})
	};

	var fields2 = {
		'applicationDate': 	new JobApplicationDate({year: 2013, month: 10, day: 21})
	  , 'employer': 		new StringWrapper2({value2: "Microsoft"})
	  , 'seeker': 			new StringWrapper3({value3: "Jane Doe"})
	  , 'title': 			new StringWrapper4({value4: "VP of Production"})
	};

	var list = new JobApplicationList();

	var application = new JobApplication(fields);
	list.add(application);

	var application = new JobApplication(fields2);
	list.add(application);

	list.reportOn(reportBuilder);
}

if (0) {
	// Test JobApplications.reportOn() with Dummy wrappers and distinct reportProperty

	var formatter = new LogFormatter(columnHeaders);
	var reportBuilder = new ReportBuilder(formatter, properties);

	var fields = {
		'applicationDate': 	new JobApplicationDate({year: 2013, month: 10, day: 2})
	  , 'employer': 		new StringWrapper2({value2: "IBM Corp."})
	  , 'seeker': 			new StringWrapper3({value3: "John Doe"})
	  , 'title': 			new StringWrapper4({value4: "VP of Development"})
	};

	var fields2 = {
		'applicationDate': 	new JobApplicationDate({year: 2013, month: 10, day: 21})
	  , 'employer': 		new StringWrapper2({value2: "Microsoft"})
	  , 'seeker': 			new StringWrapper3({value3: "Jane Doe"})
	  , 'title': 			new StringWrapper4({value4: "VP of Production"})
	};

	var jobApplications = new JobApplications();

	var application = new JobApplication(fields);
	jobApplications.add(application);

	var application = new JobApplication(fields);
	jobApplications.add(application);

	jobApplications.reportOn(reportBuilder);
}




if (0) {
	// Job & JobTitle.reportOn()
	var formatter = new LogFormatter(columnHeaders);
	var reportBuilder = new ReportBuilder(formatter, new ReportColumnProperties(["title"]));
	var title = new JobTitle({title: "Front-End Developer"});

	title.reportOn(reportBuilder);

	var job = createJob({title: "Back-End Developer"});
	job.reportOn(reportBuilder);

}

if (0) {
	// Company Name.reportOn(), Employer.reportOn()

	var companyName = new CompanyName({name: "ibm"});
	var formatter = new LogFormatter(columnHeaders);
	var reportBuilder = new ReportBuilder(formatter, new ReportColumnProperties(["name"]));

	companyName.reportOn(reportBuilder);

	var ibm = EmployerFactory.create({name: "microsoft"});	
	ibm.reportOn(reportBuilder);
}

if (0) {

	//	columnMapping 

	// Job.reportOn() works -> JobTitle  ===> 'title'  -> Job.title
	// Employer.reportOn() works -> Name ===> 'name'   -> Employer.name

	// Employer.reportOn() works -> Name ===> 'name'   -> Employer.postedJobs

	// For each column (and index), we want specific fieldss


	// WORK: JobApplication.ApplicationDate.date
	// Test: JobApplication.JobTitle.title

	// Test: JobApplication.Employer.name (just name, no PostedJobs)
	// Test: JobApplication.JobSeeker.name

	console.log("==========================");

	var columnHeaders = {
		"applicationDate": "Application Date"
	  , "value2": "Company Name"
	  , "value3": "Job Seeker"
	  , "value4": "Job Title"
	  , "title" : "JOB TITLE"
	};

	// This is where we do the matching for the right property

	// DataCollecteorField()

	var properties = new ReportColumnProperties(
		["applicationDate", "value2", "value3", "value4"]
	);

	var formatter = new LogFormatter(columnHeaders);
	var reportBuilder = new ReportBuilder(formatter, properties);

	var fields = {
		'applicationDate': 	new JobApplicationDate({year: 2013, month: 10, day: 2})
	  , 'employer': 		new StringWrapper2({value2: "IBM Corp."})
	  , 'seeker': 			new StringWrapper3({value3: "John Doe"})
	  , 'title': 			new StringWrapper4({value4: "VP of Development"})
	};

	var list = new JobApplicationList();

	var application = new JobApplication(fields);
	list.add(application);

	list.reportOn(reportBuilder);
}


if (1) {

		var Attribute = Model.extend({
			reportOn: function(reportBuilder) {
		  		var value = "" + this.get("value");
		  		reportBuilder.display(value);
			}
		});


		var Aggregate = Model.extend({

			reportOn: function(reportBuilder) {
			  	var self = this;

		  		var reportOnProperty = function(prop) {
					reportBuilder.trace(prop);

			  		var property = self.get(prop);
		  			property.reportOn(reportBuilder);

				  	reportBuilder.endTrace(prop);
		  		}

		  		var list = this.get("attributeList");
		  		for (var i = 0; i < list.length; i++) {
		  			var prop = list[i];
		  			reportOnProperty(prop);
		  		}
		  	}
		});


		var PersonName = Aggregate.extend({
			defaults: {
				firstName: null
			  , lastName: null
			  , attributeList: ["firstName", "lastName"]
			}
		  , initialize: function(fields) {
				this.checkMissingFields("PersonName", fields, ["firstName", "lastName"]);
			}
		  , getFullName: function() {
		  		throw new Error("Cannot use getters!!!");			// No GETTERS!!!

		  		var first = this.get("firstName").get("value");
		  		var last = this.get("lastName").get("value");
		  		var fullName = first + " " + last;

		  		return fullName;
		    }
		});

			var FirstName = Attribute.extend({
				defaults: {
					value: null
				}
			  , initialize: function(fields) {
					this.checkMissingFields("FirstName", fields, ["value"]);
				}
			});

			var LastName = Attribute.extend({
				defaults: {
					value: null
				}
			  , initialize: function(fields) {
					this.checkMissingFields("LastName", fields, ["value"]);
				}
			});

/*
	var RecordMaker = function(_) {
		var record = new RecordCollector();

		this.add = function(field) {
			record.add(field);
		};

		this.isLastField = function(field) {
			var isLastField = (field['name.lastName']);
			return isLastField;
		};

		this.clearRecord = function() {
			record.clear();
		};

		this.getRecord = function() {
			return record.get();
		};
	};
	*/

	var ReportColumn = function(header, fields, fieldMaker) {
		this.header = header;
		this.fields = fields;
		this.fieldMaker = fieldMaker;
	};

	var jobSeekerColumn = new ReportColumn(
		"JobSeeker"
	  , ["name.firstName", "name.lastName"] // ["seeker.name.firstName", "seeker.name.lastName"]
	  , function buildFullName(fields) {
			var first = fields["name.firstName"] || "---";
			var last = fields["name.lastName"] || 'XXX';
			var fullName = first + " " + last;
			return fullName;
		}
	);

	var JobApplicationDate = Attribute.extend({
		initialize: function(fields) {
	  		this.checkMissingFields("JobApplicationDate", fields, ["year", "month", "day"]);

	  		var year = fields["year"];
	  		var month = fields["month"];
	  		var day = fields["day"];

	  		var value = new DateModel(year, month, day);
	  		
	  		this.set("value", value);
		}
	});

	var ReportColumns = function(columns) {
		this.columns = columns;

		this.isLastField = function(field) {
			var lastFields = this.columns[this.columns.length-1].fields;
			var lastField = lastFields[lastFields.length-1];
			var isLastField = (field[lastField]);			
			return isLastField;
		};
	};

	var RecordBuilder = function(reportColumns, tracer) {
		var record = new RecordCollector();

		var createField = function(value) {
			var fieldKey = tracer.getTrace();
			var field = {};
			field[fieldKey] = value;
			return field;
		};

		var createFullRecord = function(record) {
			var row = {};

			var columns = reportColumns.columns;

			for (var i = 0; i < columns.length; i++) {
				var column = reportColumns.columns[i];
				var reportField = column.fieldMaker(record);
				row[column.header] = reportField;
			}
			var json = JSON.stringify(row);
			console.log(json);
		};

		var handleRecord = function(record, field) {
			var isLast = reportColumns.isLastField(field);
			if (isLast) {
				var result = record.get();
				createFullRecord(result);
				record.clear();
			}			
		};

		var add = function(value) {			
			var field = createField(value);
			record.add(field);
			handleRecord(record, field);
		};

		this.add = add;
	};


	var BasicReportBuilder = function(reportColumns) {
		var tracer = new Tracer();
		var recordBuilder = new RecordBuilder(reportColumns, tracer);

		// public ------------------------------------
		this.display = function(value) {
			recordBuilder.add(value);
		};

		this.trace = function(element) {
			tracer.trace(element);
		};

		this.endTrace = function(element) {
			tracer.endTrace(element);
		};
	};

	var JobSeeker = Aggregate.extend({
		defaults: {
			name: null
		  , attributeList: ["name"]
		}
	});

	var columns = new ReportColumns([jobSeekerColumn]);

	var reporter = new BasicReportBuilder(columns);

	var first = new FirstName({value: "John"});
	var last = new LastName({value: "McCain"});

	var myName = new PersonName({firstName: first, lastName: last});
	var seeker = new JobSeeker({name: myName});

	// myName.reportOn(reporter);
	// seeker.reportOn(reporter);

	var LoggerReportBuilder = function(reportColumns) {
		var tracer = new Tracer();

		// public ------------------------------------
		this.display = function(value) {
			console.log(tracer.getTrace(), value);
		};

		this.trace = function(element) {
			tracer.trace(element);
		};

		this.endTrace = function(element) {
			tracer.endTrace(element);
		};
	};

	var JobApplication = Aggregate.extend({
		defaults: {
			applicationDate: null
		   , attributeList: ["applicationDate", "seeker"]
		  // , employer: null
		   , seeker: null
		  // , title: null
		  // , attributeList: ["applicationDate", "seeker"]
		}
	  , initialize: function(fields) {
			this.checkMissingFields("JobApplication", fields, []
	//			["applicationDate", "employer", "seeker", "title"]
			);
		}
	});

	// TODO: two columns: applicationDate, job seeker name

	var date = new JobApplicationDate({year: 2013, month: 10, day: 26});
	// date.reportOn(reporter);

	var jobApplicationDateColumn = new ReportColumn(
		"Application Date"
	  , ["applicationDate"] // ["seeker.name.firstName", "seeker.name.lastName"]
	  , function buildDate(fields) {
	  		var value = fields["applicationDate"];
			return value;
		}
	);

	var application = new JobApplication({
		applicationDate: date
	  // , employer: null
	    , seeker: seeker
	  // , title: null
	});

//	TODO: NOT WORKING !!!
//	var columns = new ReportColumns([jobApplicationDateColumn, jobSeekerColumn]);
//  Single column IS working...

	var columns = new ReportColumns([jobApplicationDateColumn]);
	//var columns = new ReportColumns([jobSeekerColumn]);
	var reporter = new BasicReportBuilder(columns);

	application.reportOn(reporter);
}

