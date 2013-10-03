//--------------------------------------------------------------
//
// Model: JobSeeker Fields
//
//--------------------------------------------------------------

var FirstName = MyModel.extend({
	initialize: function(fields) {
		this.checkMissingFields("FirstName", fields, ["firstName"]);
		this.set("value", fields["firstName"]);
	}
});


var LastName = MyModel.extend({
	initialize: function(fields) {
		this.checkMissingFields("LastName", fields, ["lastName"]);
		this.set("value", fields["lastName"]);
	}
});


var PersonName = MyModel.extend({
	defaults: {
		firstName: null
	  , lastName: null
	}
  , initialize: function(fields) {
  		var fieldList = ["firstName", "lastName"];
		this.checkMissingFields("PersonName", fields, fieldList);

		var firstName = new FirstName(fields);
		var lastName = new LastName(fields);

		this.set("firstName", firstName);
		this.set("lastName", lastName);
	}
});
