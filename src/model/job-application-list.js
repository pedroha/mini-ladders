var JobApplicationList = Collection.extend({
    model: JobApplication

  , byDate: function(applicationDate) {
  		var filtered = this.filter(function(application) {

  			// add a method "equals"
  			var matched = (application.get("date") == applicationDate);
  			return matched;
  		});
  		var list = new JobApplicationList(filtered);
  		return list;
    }
  , byEmployer: function(employer) {
  		var filtered = this.filter(function(application) {
  			var matched = (application.get("employer") == employer);
  			return matched;
  		});
  		var list = new JobApplicationList(filtered);
  		return list;
	}
  , byDateAndEmployer: function(applicationDate, employer) {
    
  }
});

var JobApplicationManager = {
	jobApplicationList: new JobApplicationList()

  , create: function(fields) {
		var application = JobApplicationFactory.create(fields);
		var list = this.jobApplicationList;
		list.add(application);
		return application;
	}
  , getList: function() {
		return this.jobApplicationList;
	}
};