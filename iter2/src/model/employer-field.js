
var CompanyInfo = Model.extend({
	default: {
		name: null // CompanyName
	},
	initialize: function(fields) {
		this.checkMissingFields("CompanyInfo", fields, ["name"]);
		this.set("value", fields["name"]);
	}
});

var Careers = Mode.extend({
	default: {
		postedJobs: null // PostedJobs
	}
});

var PostedJobs = Model.extend({
	default: {
		list: null // JobList
	}
});

