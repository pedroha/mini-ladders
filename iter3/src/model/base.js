var Collection = Backbone.Collection.extend({
	reportOn: function(reportBuilder) {
		if (!reportBuilder) throw new Error("Collection.reportOn(): missing reportBuilder");

		var items = this;
		items.each(function(item) {
			item.reportOn(reportBuilder);
		});
	}
});

var Model = Backbone.Model.extend({

	checkMissingFields: function(className, fields, fieldList) {
		var checkForObject = function() {
			if (!_.isObject(fields)) {
				throw new Error("Model(): passing a primitive instead of a hash map of attributes");
			}			
		};

		var checkForMissingField = function(field) {
			if (!(field in fields)) {
			 	throw new Error(className + "(): missing '" + field + "' property!");
			}
		};

		var checkForMissingFields = function() {
			for (var i = 0; i < fieldList.length; i++) {
				var field = fieldList[i];
				checkForMissingField(field);
			}			
		};

		checkForObject();
		checkForMissingFields();
	}
  , equals: function(other) {
  		// Too strong: equal references (not by values)
  		// TODO: for value objects (by value content), some day...
  		var same = (this === other);
  		return same;
	}
  , reportOn: function(reportBuilder) {
		if (!reportBuilder) throw new Error("Model.buildReport(): missing reportBuilder");
		var self = this;

		// This applies for a Primitive, when an object has a single Property
		// (not when we have multiple primitives, but in our exercise, we never have such scenarios)

		var createField = function(propertyName) {
			var value = self.get(propertyName);
			var obj = {};
			obj[propertyName] = value;
			return obj;
		};

		var propertyName = this.get('reportFieldProperty');
		//alert("Property name: " + propertyName);
		if (propertyName) {
			var obj = createField(propertyName);
			reportBuilder.display(obj);
		}
	}
  , reportOnList: function(reportBuilder, items) {
		items.each(function(item) {
			item.reportOn(reportBuilder);
		});
	}
});
