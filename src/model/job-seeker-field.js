//--------------------------------------------------------------
//
// Model: JobSeeker Fields
//
//--------------------------------------------------------------

var JobSeekerProfile = Model.extend({
	defaults: {
		person:  null
	  ,	resumes: null
	}
});

	var Person = Model.extend({
		defaults: {
			name: null // PersonName
		}
	});

		var PersonName = Model.extend({
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
		  , getFullName: function() {
		  		var first = this.get("firstName").get("value");
		  		var last = this.get("lastName").get("value");
		  		var fullName = first + " " + last;
		  		return fullName;
		  }
		});

			var FirstName = Model.extend({
				initialize: function(fields) {
					this.checkMissingFields("FirstName", fields, ["firstName"]);
					this.set("value", fields["firstName"]);
				}
			});


			var LastName = Model.extend({
				initialize: function(fields) {
					this.checkMissingFields("LastName", fields, ["lastName"]);
					this.set("value", fields["lastName"]);
				}
			});


var InterestingJobs = Model.extend({
	defaults: {
		appliedJobs: null
	  , savedJobs: null
	}
});

	var AppliedJobs = Model.extend({
		defaults: {
			list: null // JobApplicationList
		}
	});

	var SavedJobs = Model.extend({
		defaults: {
			list: null // JobList
		}
	});
