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


var PipeAggregator = function(targetProperty, mapping, stream) {
	if (!targetProperty || !mapping || !stream) {
		throw new Error("StreamAggregator(), missing targetProperty, mapping or stream");
	}
	if (typeof targetProperty !== "string" || typeof mapping !== "object") {
		throw new Error("StreamAggregator(), wrong data type for targetProperty or mapping.");
	}
	if (!stream.source || !stream.target) {
		throw new Error("StreamAggregator(), missing stream.source or stream.target");
	}

	var aggregate;

	var reset = function() {
		aggregate = {};
	};

	var isAggregationComplete = function() {
		var complete = true;

		_.each(mapping, function(value, key, map) {
			var isInAggregate = (value in aggregate);
			if (!isInAggregate) {
				complete = false;
				return false;
			}
		});
		// console.log("COMPLETE: " + complete);
		return complete;
	};

	var shareAggregate = function() {
		stream.target.trigger(targetProperty, aggregate);
	};

	var onIncomingField = function(data) {
		_.extend(aggregate, data);
		// console.log("Streaming..." + JSON.stringify(aggregate));
		if (isAggregationComplete()) {
			shareAggregate();
			reset();
		};
	}

	var collectField = function(field) {
		stream.source.on(field, onIncomingField);
	};

	var collectFields = function() {
		_.each(mapping, function(value, key, map) {
			var field = key;
			collectField(field);
		});
	};

	reset();
	collectFields();
};

