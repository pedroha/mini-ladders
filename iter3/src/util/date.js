
var createMomentDate = function(year, month, day) { // This could be private to the DateModel
	
	// month is 1-based, day is 1-based (no zero based indexing for these)
  	assert( ("" + year).length == 4, "DateModel(), missing year, month, day");
  	var month = (month < 10) ? "0" + month : month;
  	var day = (day < 10)? "0" + day : day;
  	var str = "" + year + month + day;
  	var momented = moment(str, "YYYYMMDD");	
  	return momented;
  	// return str;
};

var DateModel = function(year, month, day) {
  	if (!year || !month || !day) {
  		throw new Error ("DateModel(): Missing year, month, day");
  	}
  	var date = new Date(year, month, day);
  	this.time = date.getTime();
	this.date = createMomentDate(year, month, day);
};

DateModel.prototype.equals = function(other) {
	var isLikeDate = (other && other.getTime && typeof other.getTime == "function");
	var sameTime = (isLikeDate && other.getTime() == this.time);
	return sameTime;
};

DateModel.prototype.getTime = function() { // follow same interface as JS Date()
	return this.time;
};

DateModel.prototype.toString = function() {
	return this.format("YYYY-MM-DD");
};

DateModel.prototype.format = function(fmt) {
	if (!fmt) throw new Error("DateModel.format(): fmt is missing");
	var date = this.date;
	var formatted = date.format(fmt);
	return formatted;
};
