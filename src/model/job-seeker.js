//--------------------------------------------------------------
//
// Model: JobSeeker
//
//--------------------------------------------------------------

var JobSeeker = MyModel.extend({
	initialize: function(fields) {
		var fieldList = ["firstName", "lastName"];
		this.checkMissingFields("JobSeeker", fields, fieldList);

		var fullName = new PersonName(fields);
		this.set("name", fullName);
	}
});

var JobSeekerList = Backbone.Collection.extend({
	model: JobSeeker
});

var JobSeekerFactory = {
	create: function(fields) {
		var seeker = new JobSeeker(fields);
		return seeker;
	}
};

var JobSeekerManager = {
	jobSeekerList: new JobSeekerList()

  , create: function(fields) {
		var seeker = JobSeekerFactory.create(fields);
		var list = this.jobSeekerList;
		list.add(seeker);
		return seeker;
	}
  , getList: function() {
		return jobSeekerList;
	}
};
