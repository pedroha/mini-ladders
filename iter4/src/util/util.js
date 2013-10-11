function assert(condition, message) {
    if (!condition) {
        throw new Error(message || "Assertion failed");
    }
}

// http://stackoverflow.com/questions/10624057/get-name-as-string-from-a-javascript-function-reference

Function.prototype.getName = function() {
	var name=this.toString();
	var reg=/function ([^\(]*)/;
	return reg.exec(name)[1];
};

var Tracer = function Stacker() {
	this.traced = [];
	this.current = [];
};

Tracer.prototype.trace = function(element) {
	this.current.push(element);
	var clone = this.current.slice(0);
	this.traced.push(clone);
	return this;
};

Tracer.prototype.endTrace = function(element) {
	this.current.pop();
};

Tracer.prototype.getTrace = function() {
	var trace = this.current;
	return trace.join(".");
};

Tracer.prototype.getTraces = function(prefix) {
	prefix = prefix + "+++++";
	var msg = prefix + JSON.stringify(this.traced);
	return msg;
};


var testTracer = function() {
	// Test Tracer!

	var tracer = new Tracer();

	tracer.trace("I");
	console.log(tracer.getTrace());
	tracer.trace("like");
	console.log(tracer.getTrace());
	console.log(tracer.getTraces("+++"));
	tracer.trace("bananas");
	console.log(tracer.getTrace());

	tracer.endTrace();
	tracer.endTrace();
	tracer.endTrace();

	console.log(tracer.getTraces("==="));

// testTracer();
};

