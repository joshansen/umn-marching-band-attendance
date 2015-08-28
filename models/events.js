var mongoose = require("mongoose");
var logger = require("logfmt");
var timestamps = require("mongoose-timestamps");
var Promise = require("promise");

module.exports = function createEventsModel(connection){

	var Schema = mongoose.Schema({
		createdBy: { type: String, required: true},
		name:{ type: String, required: true },
		startDateTime: { type: Date, required: true },
		endDateTime: { type: Date, required: true },
		description: { type: String },
		//Required or Make Up
		type: { type: String, required: true },

	});

	Schema.plugin(timestamps);

	Schema.statics = {
		get: function(id) {
	      return new Promise(function(resolve, reject) {
	        this.findById(id).exec(function(err, record) {
	          if (err) return reject(err);
	          if (!record) return reject(new errors.ArticleNotFound());
	          resolve(record);
	        });
	      }.bind(this));
	    },

	    getAll: function(id) {
	    	return;
	    }
	};

	var Events = connection.model("Events", Schema);
	return Events;
};