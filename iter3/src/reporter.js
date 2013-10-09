var StringWrapper = Model.extend({
});

var JobApplication = Model.extend({
	initialize: function(fields) {
		this.checkMissingFields("JobApplication", fields,
			["applicationDate", "employer", "title", "seeker"]
		);
	}
  , reportOn: function(reportBuilder) {
  		var items = [];
  		items.push(this.get("employer"));
  		items.push(this.get("applicationDate"));
  		items.push(this.get("seeker"));
  		items.push(this.get("title"));

  		this.reportOnList(reportBuilder, items);
	}
});

var JobApplicationList = Collection.extend({ // contained by the JobSeeker.appliedJobApplications
	model: JobApplication
});

var JobApplicationFactory = new function() {

	var create = function() {

	};

	var list = function() {

	};

	var api = {
		create: create
	  , list: list
	};
	return api;
};
