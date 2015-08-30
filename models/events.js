var mongoose = require("mongoose");
var logger = require("logfmt");
var timestamps = require("mongoose-timestamps");
var Promise = require("promise");

var errors = require("./errors");

module.exports = function createEventsModel(connection){

	var Schema = mongoose.Schema({
		createdBy: { type: String, required: true},
		name: { type: String, required: true },
		startDateTime: { type: Date, required: true },
		endDateTime: { type: Date, required: true },
		description: { type: String },
		//Option -> Required or Make Up
		//Create validation for these
		type: { type: String, required: true },

	});

	Schema.plugin(timestamps);

	Schema.set('toJSON');

	Schema.statics = {
		//remove when id supported in list
		get: function(id) {
			return new Promise(function(resolve, reject) {
				this.findById(id).exec(function(err, record) {
					if (err) return reject(err);
					if (!record) return reject(new errors.RecordNotFound());
					logger.log({ type: 'info', msg: 'sent event', id:record.id});
					resolve(record);
				});
			}.bind(this));
		},

		//add support for url query string: date range, limit results, user, type, and id
		list: function() {
			return new Promise(function(resolve, reject){
				this.find({}).exec(function(err, records){
					resolve(records);
				})
			}.bind(this));
		},

		//TODO create this function
		update: function(id, json) {
			return new Promise(function(resolve, reject){

			}.bind(this));
		},

		add: function(json) {
			return new Promise(function(resolve, reject){
				this.create(json, onSave);

				function onSave(err, events) {
					if (err) {
						logger.log({ type: 'error', msg: 'could not save', error: err });
						return reject(err);
					}
					logger.log({ type: 'info', msg: 'saved event(s)'});
					return resolve(events);
				}

			}.bind(this));;
		}

	};

	var Events = connection.model("Events", Schema);
	return Events;
};