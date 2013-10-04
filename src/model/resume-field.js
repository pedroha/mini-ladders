var ResumeTitle = Model.extend({
	default: {
		value: null
	},
	initialize: function(fields) {
		this.checkMissingFields("ResumeTitle", fields, ["title"]);
		this.set("value", fields["title"]);
	}
});

var ResumeContent = Model.extend({
	default: {
		value: null
	},
	initialize: function(fields) {
		this.checkMissingFields("ResumeContent", fields, ["content"]);
		this.set("value", fields["content"]);
	}
});
