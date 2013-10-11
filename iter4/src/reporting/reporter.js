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
		var display = JSON.stringify(target);
		console.log("===> " + display);
	};
};

var RecordCollector = function() {
	var record = {}; // Collect all the fields here!

	this.add = function(props) {
		record = _.extend(record, props);
	};

	this.clear = function() {
		record = {};
	};

	this.get = function() {
		return record;
	};
};

var ReportColumnProperties = function(propertyList) {
	if (!propertyList) {
		throw new Error("ColumnData() missing propertyList");
	}
	this.propertyList = propertyList;
};


ReportColumnProperties.prototype.containsAllFields = function(data) {
	// Check for last field (i.e. optimization, which could break)

	// Optimization for this particular case: check for the last field!
	var list = this.propertyList;
	var lastProperty = list[list.length-1];
	var isLastField = !!data[lastProperty];

	return isLastField;

	// General case:
	/*
	if (1) {
		var list = this.propertyList;
		// console.log("====>" + JSON.stringify(data));

		var containsAll = true;

		for (var i = 0; i < list.length; i++) {
			var p = list[i];

			var exists = (p in data);
			if (!exists) {
				containsAll = false;
				break;
			}
		}
		return containsAll;
	}
	*/
};


ReportColumnProperties.prototype.getRelevantFields = function(data) {
	var result = {};

	var propertyList = this.propertyList;

	propertyList.forEach(function(property) {
		var p  = property;
		if (p in data) {
			if (data.hasOwnProperty(p)) {
				result[p] = data[p];
			}
		}
	});
	return result;
};

var ReportBuilder = function(formatter, columnProperties) {
	formatter = formatter || new LogFormatter();

	var propertyTracer = new Tracer();

	var record = new RecordCollector();

	var displayRecord = function() {
		var row = record.get();
		formatter.display(row);
		record.clear();
	};

	this.display = function(field) {

		// TODO: Check that we only get the fields that are defined in columnProperties
		var relevantFields = columnProperties.getRelevantFields(field);
		record.add(relevantFields);

		// Possible to apply Strategy pattern: Record.handler
		// IncompleteRecord.handler
		// CompleteRecord.handler

		var isRecordComplete = columnProperties.containsAllFields( record.get() );
		if (isRecordComplete) {
			displayRecord();
		}
	};

	this.trace = function(element) {
		propertyTracer.trace(element);
	};

	this.endTrace = function(element) {
		propertyTracer.endTrace(element);
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

