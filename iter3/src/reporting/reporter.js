
var LogFormatter = function(columnHeader) {

	var addProperty = function(key, value, target) {
		if (key in columnHeader) {
			key = columnHeader[key];
		}
		target[key] = value;
	};

	var remapKeysToColumnHeader = function(source, target) {
		for (var key in source) {
			if (source.hasOwnProperty(key)) {
				addProperty(key, source[key], target);
			}
		}
	};

	this.display = function() {
		var source = arguments[0];
		var target = {};

		remapKeysToColumnHeader(source, target);
		// var display = JSON.stringify(target);
		// console.log("===> " + display);
	};
};

var ReportBuilder = function(formatter) {
	formatter = formatter || new LogFormatter();

	var record = {}; // Collect all the fields here!

	this.display = function(data) {
		var args = [].slice.call(arguments, 0);
		formatter.display(args);

		record = _.extend(record, args[0]);
		//alert(JSON.stringify(record));
	};

	this.reportRecord = function() {
		console.log(">>>" + JSON.stringify(record));

		formatter.display(record);
		record = {};
	};

	this.shows = function(field) {
		return true;
	};
};

var ReportFormatter = function(outputFormat, columnFieldMapping) {
	this.outputFormat = outputFormat;

	this.display = function(data) {
		var data = JSON.stringify(data);
		console.log(data);
	};
};
