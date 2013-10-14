var error = function(msg) {
	throw new Error(msg);
};

var createEmitter = function() {
	var emitter = LucidJS.emitter();
	return emitter;
};

var createObject = function(key, value) {
	var result = {};
	result[key] = value;
	return result;
};

var getKey = function(data) {
	var key;
	for (var p in data) {
		if (data.hasOwnProperty(p)) { // JS looping pattern
			key = p;
			break;
		}
	}
	return key;
};


/*

var PrimitiveTranslator = function(mapping, source, target) {
	if (!mapping || !source || !target) {
		throw new Error("PrimitiveTranslator(). Missing arguments: mapping, source, target");
	}

	var translateKey = function(key) {
		var transformed = mapping[key];
		if (!transformed) {
			error("Cannot translate field: " + key); 
		}	
		return transformed;
	};

	source.on('primitive', function(data) {
		var key = getKey(data);
		var translatedKey = translateKey(key);
		var data = createObject(translatedKey, value);
		target.trigger('field-part.' + getKey(data), data);
	});
};

*/

/*
 * Listens to the translation of the fields from the PrimitiveTranslator: 
 */



var BatchTracker = function(properties /* array of string */, source, target) {

	var visited = {};

	var init = function() {
		for (var i = 0; i < parts.length; i++) {
			var key = parts[i];
			visited[key] = false;
		}
	};

	var reset = function() {
		for (var p in visited) {
			if (visited.hasOwnProperty(p)) {
				visited[p] = false;
			}
		}
	};

	var isComplete = function() { // TODO: split into short methods (IDENTATION RULE)
		var complete = true;

		for (var p in visited) {
			if (visited.hasOwnProperty(p)) {
				if (!visited[p])) {
					complete = false;
					true;
				}
			}
		}
		return complete;
	};

	var visit = function(property) {
		if (visited[property]) {
			throw new Error("Already visited: " + property);
		}
		visited[property] = true;

		if (isComplete()) {
			console.log("ALL COMPLETE");
		}
	};

	init();

//	source.

	return {
		visit: visit
	  , isComplete: isComplete
	}
};



var FieldListener = function(property, source, target) {
	var subject = 'field-part'

	source.on(subject, function(data) {

		if (allFieldsAreHere) {
			target.trigger('field')
		}
		else {
			// collect each of the fields (if things are weird, report this!)
		}
	});
};


var Reporter = function(mapping, centralEmitter) {
	if (!mapping) {
		error('DataValueListener(). Missing mapping');
	}
	var emitter = createEmitter();

	emitter.on('primitive', function(data) {
		var json = JSON.stringify(data);
		console.log(json);
	});

	cenltralEmitter.pipe()

	var translate = function(key, value) {
		var transformed = mapping[key];
		if (!transformed) {
			error("Cannot translate field: " + key); 
		}
		var data = createObject(key, value);
		emitter.trigger('primitive.' + key, data);
		return transformed;
	};

	return {
		display: translate
	}
};


var PrimitiveListener = function() {
	var emitter = createEmitter();
}

var FieldListener = function(fields) {
	var emitter = createEmitter();
};

var RecordListener = function() {
	var emitter = createEmitter();

};

var ReportListener = function() {
	var emitter = createEmitter();
};

var test = function() {

	var primitiveValueData = {
		'seeker.name.firstName': 'John'
	  , 'seeker.name.lastName': 'Doe'
	  , 'applicationDate' : '2013-10-21'
	};

	var primitiveValueDataMap = {
		'seeker.name.firstName': 'jobseeker-firstname'
	  , 'seeker.name.lastName': 'jobsekker-lastname'
	  , 'applicationDate' : 'application-date'
	};

	var translationEmitter = createEmitter();

	var reporter = new Reporter(primitiveValueDataMap);

	for (var p in primitiveValueData) {
		var value = primitiveValueData[p];
		reporter.display(p, value);
	}

};

test();

