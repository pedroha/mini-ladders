//--------------------------------------------------------------
//
// Model: Employer
//
//--------------------------------------------------------------

var Employer = Model.extend({
	default: {
		name: null
	},
	initialize: function(fields) {
		this.checkMissingFields("Employer", fields, ["name"]);
		var name = new CompanyName({name: fields.name});
		this.set("name", name);
	}
});

var EmployerList = Collection.extend({
	model: Employer
});

var EmployerFactory = {
	create: function(fields) {
		var employer = new Employer(fields);
		return employer;
	}
};

var EmployerManager = {
	employerList: new EmployerList()

  , create: function(fields) {
		var employer = EmployerFactory.create(fields);
		var list = this.employerList;
		list.add(employer);
		return employer;
	}
  , getList: function() {
		return this.employerList;
	}
};