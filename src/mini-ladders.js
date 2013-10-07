//--------------------------------------------------------------

// var job = JobFactory.create({title: "Back-end Developer"});

/*
    var mgr = new JobManager();
    var job = mgr.create({title: "Back-end Developer", type: JOB_TYPE.ATS});
    //var job = mgr.create({title: "Back-end Developer"}); // This should fail!!

    var name = job.get("title").get("value");
    alert(name);

    var type = job.get("type").get("value");
    alert(type);

*/


if (0) {
    var microsoft = new Employer({name: "Microsoft"});
    var name = microsoft.get("name").get("value");

    alert(name);
}

if (0) {

	var seeker = new JobSeeker({firstName: "John", lastName: "Doe"});

	alert(  seeker.get("name").get("firstName").get("value") );

	var seeker = JobSeekerFactory.create({firstName: "Jane", lastName: "Wonder"});
	alert(  seeker.get("name").get("firstName").get("value") );

}

if (0) {
    var microsoft = new Employer({name: "Microsoft"});
    var name = microsoft.get("name").get("value");

    alert(name);


    var employer = EmployerFactory.create({name: "IBM"});
    employer.get("name").get("value");

    // Not working that well with Backbone (Q: "value"?)
    var name = employer.get('name');
    alert(name.get("value"));    
}

if (0) {
    var resume = ResumeManager.create({title: "Geeky res", content: "I geek all night long"});

    var title = resume.get("title").get("value");
    var content = resume.get("content").get("value");

    alert(title);
    alert(content); // + " === " + content);
}


if (0) {
    // Test: Employer can list all Job Applications

    var ibm = new EmployerEntity({name: "IBM"});

    ibm.postJob({title: "Back-End Developer", type: JOB_TYPE.ATS});
    ibm.postJob({title: "Front-End Developer", type: JOB_TYPE.JREQ});

    var list = ibm.listJobs();

    list.each(function(item) {
        console.log(">>>> " + item.get("title").get("value"));
        console.log(">>>> " + item.get("type").get("value"));
    });

    var seeker = new JobSeekerEntity({firstName: "John", lastName: "Doe"});

    var job = ibm.listJobs().first();
    var application = seeker.applyForJob(job);

    var job = ibm.listJobs().at(1);
    var application = seeker.applyForJob(job);

    var appliedJobs = ibm.listJobApplications();

    console.log("Applied jobs");
    appliedJobs.each(function(application) {
        console.log("====>" + application.get("job").get("title").get("value") );
    });

    // Can add ATS without resume, cannot add JREQ without resume
    // TODO: Add the "failed" job applications onto the system (?)
}


if (0) {
    // JobSeeker should be able to see jobs that they applied

    var ibm = new EmployerEntity({name: "IBM"});

    ibm.postJob({title: "Back-End Developer", type: JOB_TYPE.ATS});
    ibm.postJob({title: "Front-End Developer", type: JOB_TYPE.ATS});

    var list = ibm.listJobs();
    list.each(function(item) {
        console.log(">>>> " + item.get("title").get("value"));
        console.log(">>>> " + item.get("type").get("value"));
    });

    var seeker = new JobSeekerEntity({firstName: "John", lastName: "Doe"});

    var job = ibm.listJobs().first();
    var application = seeker.applyForJob(job);

    var job = ibm.listJobs().at(1);
    var application = seeker.applyForJob(job);

    var jobApplicationList = seeker.appliedJobs;

    console.log("Applied jobs by Job Seeker");
    jobApplicationList.each(function(application) {
        console.log("====>" + application.get("job").get("title").get("value") );
    });
}


if (0) {
    // Test basic reporting: CSV, HTML (look fine)

    var ibm = new EmployerEntity({name: "IBM"});

    ibm.postJob({title: "Back-End Developer", type: JOB_TYPE.ATS});
    ibm.postJob({title: "Front-End Developer", type: JOB_TYPE.ATS});

    var seeker = new JobSeekerEntity({firstName: "John", lastName: "Doe"});

    var job = ibm.listJobs().first();
    var application = seeker.applyForJob(job);

    var job = ibm.listJobs().at(1);
    var application = seeker.applyForJob(job);

    var appliedJobs = ibm.listJobApplications();

    console.log("Applied jobs");
    appliedJobs.each(function(application) {
        console.log("====>" + application.get("job").get("title").get("value") );
    });

    var content = Reporter.createReport(appliedJobs, ReportTabularAdapter, REPORT_TYPE["HTML"]);
    alert(content);
}

// TODO (more work on the Models to get the right fields)
// 1) Add fields to each of the models (for better reporting)
// 2) Add filtering, grouping, sorting functionality (under the "reporting" package)
// 3) Review all the guidelines (any broken? probably few here and there)


if (0) {
    // Report must have:
    // * Date, Employer, Title, JobSeeker name
    // Right now, we have "Title" and "Date", we need: Employer and JobSeeker names

    var ibm = new EmployerEntity({name: "IBM"});

    ibm.postJob({title: "Back-End Developer", type: JOB_TYPE.ATS});
    ibm.postJob({title: "Front-End Developer", type: JOB_TYPE.ATS});

    var seeker = new JobSeekerEntity({firstName: "John", lastName: "Doe"});

    var job = ibm.listJobs().first();
    var application = seeker.applyForJob(job);

    var job = ibm.listJobs().at(1);
    var application = seeker.applyForJob(job);

    var appliedJobs = ibm.listJobApplications();

    console.log("Applied jobs");
    appliedJobs.each(function(application) {
        var job = application.get("job");
        console.log("====>" + job.getTitle().get("value") );
    });

    var content = Reporter.createReport(appliedJobs, ReportTabularAdapter, REPORT_TYPE["CSV"]);
    alert(content);
}

if (0) {
    // JobSeeker: list applied jobs

    var ibm = new EmployerEntity({name: "IBM"});

    ibm.postJob({title: "Back-End Developer", type: JOB_TYPE.ATS});
    ibm.postJob({title: "Front-End Developer", type: JOB_TYPE.ATS});

    var seeker = new JobSeekerEntity({firstName: "John", lastName: "Doe"});

    var job = ibm.listJobs().first();
    var application = seeker.applyForJob(job);

    var job = ibm.listJobs().at(1);
    var application = seeker.applyForJob(job);

    var appliedJobs = seeker.listAppliedJobApplications();

    console.log("Applied jobs");
    appliedJobs.each(function(application) {
        var job = application.get("job");
        console.log("====>" + job.getTitle().get("value") );
    });

    var content = Reporter.createReport(appliedJobs, ReportTabularAdapter, REPORT_TYPE["CSV"]);
    alert(content);

}


if (1) {
    // Employer: list applied jobs for specific day --> Date equals + DateModel

    var ibm = new EmployerEntity({name: "IBM"});

    ibm.postJob({title: "Back-End Developer", type: JOB_TYPE.ATS});
    ibm.postJob({title: "Front-End Developer", type: JOB_TYPE.JREQ});

    var seeker = new JobSeekerEntity({firstName: "John", lastName: "Doe"});

    var date = new JobApplicationDate({
        year: 2013, month: 10, day: 21
    });

    var job = ibm.listJobs().first();
    var application = seeker.applyForJob(date, job);

    var job = ibm.listJobs().at(1);
    var application = seeker.applyForJob(date, job);

    var appliedJobs = seeker.listAppliedJobApplications();

    // Let's play with filters!

    console.log("Applied jobs");
    appliedJobs.each(function(application) {
        var job = application.get("job");
        console.log("====>" + job.getTitle().get("value") );
    });

    var content = Reporter.createReport(appliedJobs, ReportTabularAdapter, REPORT_TYPE["CSV"]);
    alert(content);

}

// Employer: list applied jobs for specific job --> Job equals
// Employer: list applied jobs for specific job and day -> Double filtering!

// Ladders: List of what Jobs did job seekers applied for a given day.
// Ladders: List of failed job applications for a given day.


