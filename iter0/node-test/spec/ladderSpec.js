"use strict";

//--------------------------------------------------------------

function JobType(name) {
  this.name = name;
}

var JOB_TYPE = {
  ATS:  new JobType("ATS")
, JREQ: new JobType("JReq")
};


function Job(jobTitle, jobType) {
  var JobTitle = function(title) {
    this.name = title;
  }
  this.title = new JobTitle(jobTitle);
  this.type = jobType;
}


function Employer(companyName, jobSystem) {
  if (!jobSystem) {
    throw new Error("Employer(jobSystem): missing jobSystem");
  }
  var CompanyName = function(name) {
    this.name = name;
  }
  this.companyName = new CompanyName(companyName);
  this.jobSystem = jobSystem;
  this.jobPosts = [];
}


Employer.prototype = {

  createJob: function(jobTitle, jobType) {
    var jobs = this.jobPosts;
    var jobSystem = this.jobSystem;

    var job = new Job(jobTitle, jobType);
    jobs.push(job);
    jobSystem.addJob(job);
    return job;
  },
  listJobs: function(jobFilter) {
    return this.jobPosts;
  },
  listJobApplications: function(jobFilter) {
    //returns jobSeekers based on filter
  }
}


function Resume(content) {
  var ResumeContent = function(content) {
    this.content = content;
  };
  this.content = new ResumeContent(content);
}

function Collection() {
  this.items = [];
}

Collection.prototype = {
  add: function(obj) {
    this.items.puhs(obj);
  }
, remove: function(obj) {
    this.items.remove(obj);
  }
, filter: function(fn) {
    return [];
  }
}

function ResumeCollection() {}
ResumeCollection.prototype = new Collection();


function JobSeeker() {
  this.resumes = [];
  this.jobApplications = [];
//  this.appliedJobs = []; // only save the "valid" jobs, "invalid" jobs will not be part of this collection
  this.savedJobs = [];
}

function JobApplication() {
  // Logic for "isValid" here !!!
}

JobType.prototype.isValid = function(jobApplication) { 
  return "false";
};

JOB_TYPE.ATS.isValid = function(jobApplication) {
  return "true";
};

JOB_TYPE.JREQ.isValid = function(jobApplication) {
  if (jobApplication.resume) {
    return "true";
  }
  return "false";
};


JobSeeker.prototype = {
  applyForJob: function(job, resume) {
    //Fail application if no resume for jReq job
    var applied = this.jobApplications;

    // Should this create a JobApplication instead (always valid?)
    var application = new JobApplication(job, resume);

    var valid = job.type.isValid(application); // check for resume

    var handlers = {
      "true": {
        handleJobApplication: function(application) {

        }
      }
    , "false": {
        handleJobApplication: function(application) {
          // Log into the JobSytem.errorApplications()
        }
      }
    };
    handlers[valid].handleJobApplication(application);
  },
  
  saveJob: function(job) {
    var saved = this.savedJobs;
    saved.push(job);
  },

  listAppliedJobs: function() {
    return this.jobApplications;
  },
  listSavedJobs: function() {
    return this.savedJobs;
  }
}

function JobSystem() {
  this.allJobs = [];
  this.employers = [];
}

var JobFactory = {};    // creates Employeers, JobSeekers.  


var TabularReport = function() {
  this.getNumColumns = function() {}
  this.getNumRows = function() {}
  this.sortByColumn = function(j) {}
  this.getCell = function(i, j) {}
};

var Report = {
  CSVFormatter: {
    formatReport: function() {
    }
  },
  HTMLFormatter = {
    formatReport: function() {
    }
  } 
}


function JobApplicationDate(day, month, year) {
  this.date = new Date(year, month, day);
}

JobSystem.prototype = {
  createEmployer: function(companyName) {
    var e = new Employer(companyName, this);
    this.employers.push(e);
    return e;
  },
  addJob: function(job) {
    var jobs = this.allJobs;
    jobs.push(job);
  },
  listAllJobs: function() {
    return this.allJobs;
  },

  listJobSeekers: function(jobFilter) {
    //filter by job, date, employer
  },
  createJobApplicationReport: function(jobFilter, reportType) {
    // aggregate job application numbers by job and employer
    // jobseeker, job, employer, job application date

    var collection = listJobApplications(jobFilter);

    var rowAccessor = "Strategy to convert object fields into tabular row accessor";

    var tabularReport = createTabularData(collection, rowAccessor);

    // tabularReport.sort() ?

    var formatter = getFormatter(reportType);
    return formatter.format(tabularReport);
  }
  // ,
  // formatReport: function(report, reportType) {
  //   //return type: CSV or HTML
  // }
}


//possible filters
function JobFilter() {
  this.employer = null;
  this.jobApplicationDate = null;
  this.jobTitle = null;
  this.applicationStatus = null;
}

console.error(">>>>>>>>>");

describe("Employer use cases", function() {
  var miniLadders = new JobSystem();

  it("can post a new job", function() {
    var employer = miniLadders.createEmployer("IBM");
    var jobs, len;
    
    jobs = employer.listJobs();
    len = jobs.length;

    employer.createJob("Front-End Developer", JOB_TYPE.ATS);
    jobs = employer.listJobs();

    expect(jobs.length).toBe(len + 1);
  });

  describe("employer can get a list of jobs they posted", function() {
    var employer;
    var list;
    var job;

    beforeEach(function() {
      employer = miniLadders.createEmployer("IBM");

      employer.createJob("Back-End Developer", JOB_TYPE.JREQ);
      employer.createJob("Front-End Developer", JOB_TYPE.ATS);

      list = employer.listJobs();
    });
    
    it("the list count is correct", function() {
      expect(list.length).toBe(2);
    });

    it("the job title is correct", function() {
      var job = list[0];
      var title = job.title.name;
      expect(title).toBe("Back-End Developer");
    });

  });
});

describe("JobSeeker use cases", function() {
  var jobSeeker,
      miniLadders = new JobSystem(),
      employer = miniLadders.createEmployer("IBM"),
      ATSJob = employer.createJob("ATS Job Title", JOB_TYPE.ATS),
      jReqJob = employer.createJob("jReq Job Title", JOB_TYPE.JREQ),
      resume = new Resume("I can do it!!!!");

  beforeEach(function() {
    jobSeeker = new JobSeeker();
  });

  it("can successfully apply for jReq job with resume", function() {
    jobSeeker.applyForJob(jReqJob, resume);
    var jobApplications = jobSeeker.listAppliedJobs();
    expect(jobApplications[0].job).toBe(jReqJob);
  });

  it("can not apply for jReq job without resume", function() {
    jobSeeker.applyForJob(jReqJob);
    var appliedJobs = jobSeeker.listAppliedJobs();
    expect(appliedJobs.length).toBe(0);
  });

  it("can apply for ATS job without resume", function() {
    jobSeeker.applyForJob(ATSJob);
    var appliedJobs = jobSeeker.listAppliedJobs();
    expect(appliedJobs[0]).toBe(ATSJob);
  });

  it("can apply for ATS job with resume", function() {
    jobSeeker.applyForJob(ATSJob, resume);
    var appliedJobs = jobSeeker.listAppliedJobs();
    expect(appliedJobs[0]).toBe(ATSJob);
  });

  it("can save a job", function() {
    jobSeeker.saveJob(ATSJob);
    var savedJobs = jobSeeker.listSavedJobs();
    expect(savedJobs[0]).toBe(ATSJob);
  });

  it("can list saved jobs", function() {
    jobSeeker.saveJob(ATSJob);
    jobSeeker.saveJob(jReqJob);
    var listSavedJobs = jobSeeker.listSavedJobs();
    expect(listSavedJobs.length).toBe(2);
  });

  it("can list applied jobs", function() {
    jobSeeker.applyForJob(ATSJob);
    jobSeeker.applyForJob(jReqJob, resume);
    var listAppliedJobs = jobSeeker.listAppliedJobs();
    expect(listAppliedJobs.length).toBe(2);
  });
});

describe("JobSystem use cases", function() {

  var miniLadders = new JobSystem(),
      jobSeeker = new JobSeeker(),
      employer = miniLadders.createEmployer("Microsoft"),
      jReqJob = employer.createJob("Back-End Developer", JOB_TYPE.JREQ),
      ATSJob = employer.createJob("Front-End Developer", JOB_TYPE.ATS),
      resume;

  jobSeeker.applyForJob(ATSJob)
  jobSeeker.applyForJob(jReqJob, resume);

  it("can list all jobs", function() {
    var allJobs = miniLadders.listAllJobs();
    expect(allJobs.length).toBe(2);
  });

  it("can list all jobseekers by date", function() {
    //jobSeeker, job, employer, application date
      expect(true).toBe(false);
  });

  it("can list all jobseekers by employer", function() {
    //jobSeeker, job, employer, application date
      expect(true).toBe(false);
  });

  it("can list all jobseekers by date and employer", function() {
    //jobSeeker, job, employer, application date
      expect(true).toBe(false);
  });

  it("create html job application report", function() {
    //jobSeeker, job, employer, application date in html
      expect(true).toBe(false);
  });

  it("create csv job application report", function() {
    //jobSeeker, job, employer, application date in csv
      expect(true).toBe(false);
  });

  it("create success/fail aggregate job application report", function() {
      expect(true).toBe(false);
  });
  
});
