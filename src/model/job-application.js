//--------------------------------------------------------------
//
// Model: JobApplication
//
//--------------------------------------------------------------

var createDate = function(year, month, day) {
		// month is 1-based, day is 1-based (no zero based indexing for these)
	  	assert( ("" + year).length == 4, "DateModel(), missing year, month, day");
	  	var month = (month < 10) ? "0" + month : month;
	  	var day = (day < 10)? "0" + day : day;
	  	var str = "" + year + month + day;
	  	var momented = moment(str, "YYYYMMDD");	
	  	return momented;
	  	// return str;
	};


var DateModel = Model.extend({	// All internal dates using moment() API
	default: {
		value: null
	}
  , initialize: function(year, month, day) {
  	/*
  		console.log(">>>>>>>>>>>>")
  		for (var i = 0; i < arguments.length; i++) {
  			console.log( JSON.stringify(arguments[i] ));
  		}
  		console.log(">>>>>>>>>>>>")

	  	var date = createDate(year, month, day);

	  	this.set("value", date);
	  	*/
	}
});

var JobApplicationDate = Model.extend({
});

var JobApplication = Model.extend({
	default: {
		date: null
	  , job: null
	}
  , initialize: function(fields) {
		var fieldList = ["job", "applicationDate"];
		this.checkMissingFields("JobApplication", fields, fieldList);

		this.set("job", fields["job"]);
		this.set("date", fields["applicationDate"]);
	}
});

var JobApplicationFactory = {
	create: function(fields) {
		var application = new JobApplication(fields);
		return application;
	}
};

// ------------------------------------------------------------

/*
var JobApplication = Model.extend({
	default: {
		requester: null
	  , request: null
	}
});
*/

// ------------------------------------------------------------