"strict mode";

var StringWrapper = Model.extend({
	defaults: {
		value: null
	  , reportFieldProperty: 'value'
	}
});

var StringWrapper2 = StringWrapper.extend({
	defaults: {
		value2: null
	  , reportFieldProperty: 'value2'
	}
})

var StringWrapper3 = StringWrapper.extend({
	defaults: {
		value3: null
	  , reportFieldProperty: 'value3'
	}
})

var StringWrapper4 = StringWrapper.extend({
	defaults: {
		value4: null
	  , reportFieldProperty: 'value4'
	}
});


var JobApplicationDate = Model.extend({
	defaults: {
		date: null
	  , reportFieldProperty: 'date'
	}
  , initialize: function(fields) {
  		this.checkMissingFields("JobApplicationDate", fields, ["year", "month", "day"]);

  		var year = fields["year"];
  		var month = fields["month"];
  		var day = fields["day"];

  		var value = new DateModel(year, month, day);
  		
  		this.set("date", value);
	}
  , reportOn: function(reportBuilder) {
  		var value = this.get("date");
  		var display = value.toString();
  		
  		reportBuilder.display({
  			applicationDate: display
  		})
	}
});

var JobApplication = Model.extend({
	defaults: {
		applicationDate: null
	  , employer: null
	  , seeker: null
	  , title: null
	}
  , initialize: function(fields) {
		this.checkMissingFields("JobApplication", fields,
			["applicationDate", "employer", "seeker", "title"]
		);
	}
  , reportOn: function(reportBuilder) {
  		if (!reportBuilder) throw new Error("JobApplication.reportOn: Missing reportBuilder!");

  		var items = [];
  		items.push(this.get("applicationDate"));
  		items.push(this.get("employer"));
  		items.push(this.get("seeker"));
  		items.push(this.get("title"));

  		this.reportOnArray(reportBuilder, items);
  		reportBuilder.reportRecord();
	}
});

