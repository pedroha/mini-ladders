//-----------
// util
//-----------

var MyModel = Backbone.Model.extend({
	checkMissingFields: function(className, fields, fieldList) {
		console.log(JSON.stringify(fields));

		for (var i = 0; i < fieldList.length; i++) {
			var field = fieldList[i];
			if (!(field in fields)) {
			 	throw new Error(className + "(): missing '" + field + "' property!");
			}		
		}
	}
});

//-------


var CompanyName = MyModel.extend({
	defaults: {
		value: null
	}
  , initialize: function(fields) {
		this.checkMissingFields("CompanyName", fields, ["name"]);
		this.set("value", fields.name);
	}
});
