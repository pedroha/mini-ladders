"use strict";

function JobType(name) {
  this.name = name;
}

var JOB_TYPE = {
  ATS:  new JobType("ATS")
, JREQ: new JobType("JReq")
, NULL: new JobType("NULL")
};


function JobTitle(title) {
  this.name = title;
}

function Job(jobTitle, jobType) {
  var validJobType = jobType instanceof JobType;
  if (!validJobType) {
    throw new Error("Job(title, jobType), expecting jobType to be of JobType");
  }
  this.jobTitle = jobTitle;
  this.jobType = jobType;
}

function CompanyName(name) {
  this.name = name;
}

function Employer(companyName, jobSystem) {
  if (!(companyName instanceof CompanyName)) {
    throw new Error("Employer(companyName, jobSystem): companyName must be of CompanyName type");
  }
  if (!jobSystem) {
    throw new Error("Employer(jobSystem): missing jobSystem");
  }
  this.companyName = companyName;
  this.jobSystem = jobSystem;
  this.jobPosts = [];
}

Employer.prototype = {

  createJob: function(title, jobType) {
    var jobs = this.jobPosts;
    var jobSystem = this.jobSystem;

    var jobTitle = new JobTitle(title);
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

function ResumeContent(content) {
  this.content = content;
}

function Resume(content) {
  this.content = new ResumeContent(content);
}


function JobSeeker() {
  this.resumes = [];
  this.jobApplications = [];
//  this.appliedJobs = []; // only save the "valid" jobs, "invalid" jobs will not be part of this collection
  this.savedJobs = [];
}

function JobApplication() {
  // Logic for "isValid" here !!!
}

var handlers = {
  "true": {
    handleJobApplication: function(application) {
    }
  }
, "false": {
    handleJobApplication: function(application) {
    }
  }
};

JobSeeker.prototype = {
  applyForJob: function(job, resume) {
    //Fail application if no resume for jReq job
    var applied = this.jobApplications;

    // Should this create a JobApplication instead (always valid?)
    var application = new JobApplication();

    var valid = (job.jobType == JOB_TYPE.ATS) ||
                (job.jobType == JOB_TYPE.JREQ && resume);

    handlers[valid].handleJobApplication(application);
/*
    if (valid) {
      applied.push(job);
    }
    else {  // ELSE !!!!
      // Save to Application Error
    }
*/

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
var JobReporting = {};

function JobApplicationDate(day, month, year) {
  this.date = new Date(year, month, day);
}



JobSystem.prototype = {
  createEmployer: function(companyName) {
    var c = new CompanyName(companyName);
    var e = new Employer(c, this);
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
      var title = job.jobTitle.name;
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
    var appliedJobs = jobSeeker.listAppliedJobs();
    expect(appliedJobs[0]).toBe(jReqJob);
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
