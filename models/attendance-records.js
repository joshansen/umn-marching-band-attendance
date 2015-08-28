var mongoose = require("mongoose");
var logger = require("logfmt");
var timestamps = require("mongoose-timestamps");
var Promise = require("promise");

module.exports = function createAttendanceRecordsModel(connection){

	var Schema = mongoose.Schema({

	});

	Schema.plugin(timestamps);

	Schema.statics = {

	}

	Schema.methods = {

	}

	var AttendanceRecords = connection.model("AttendanceRecords", Schema);
	return AttendanceRecords;
}