//--------------------------------------------------------------
//
// Model: Resume
//
//--------------------------------------------------------------

var Resume = MyModel.extend({
	default: {
		title: null
	  , content: null
	  , owner: null
	},
	initialize: function(fields) {
		this.checkMissingFields("Resume", fields, ["title", "content", "owner"]);

		var content = new ResumeContent(fields);
		var title   = new ResumeTitle(fields);
		var owner   = fields["owner"];

		this.set("content", content);
		this.set("title", title);
		this.set("owner", owner);
	}
});

var ResumeList = Backbone.Collection.extend({
	model: Resume
});

var ResumeFactory = {
	create: function(fields) {
		var resume = new Resume(fields);
		return resume;
	}
};

var ResumeManager = {
	resumeList: new ResumeList()

  , create: function(fields) {
		var resume = ResumeFactory.create(fields);
		var list = this.resumeList;
		list.add(resume);
		return resume;
	}
  , getList:  function() {
		return this.resumeList;
	}
};