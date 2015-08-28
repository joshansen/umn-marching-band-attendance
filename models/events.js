var mongoose = require("mongoose");
var logger = require("logfmt");
var timestamps = require("mongoose-timestamps");
var Promise = require("promise");

module.exports = function createEventsModel(connection){

	var Schema = mongoose.Schema({

	});

	Schema.plugin(timestamps);

	Schema.statics = {

	}

	Schema.methods = {

	}

	var Events = connection.model("Events", Schema);
	return Events;
}