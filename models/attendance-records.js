var mongoose = require("mongoose");
var logger = require("logfmt");
var timestamps = require("mongoose-timestamps");
var Promise = require("promise");

var Event = require("./events");
var AbsenceRequest = require("./absence-requests");

module.exports = function createAttendanceRecordsModel(connection){

	var Schema = mongoose.Schema({
		userHref: { type: String, required: true},
		createdBy: { type: String, required: true},
		present: { type: Boolean, required: true },
		minutesMissed: { type: Number, default: 0, min: 0 },
		reasonForAbsence: { type: String },
		minutesToMakeup: { type: Number, default: 0, required: true },
		event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
		date: { type: Date },
		absenceRequest: { type: mongoose.Schema.Types.ObjectId, ref: 'AbsenceRequest' },
		confirmed: { type: Boolean, default: false },
		disputed: { type: Boolean, default: false }

	});

	Schema.plugin(timestamps);

	Schema.statics = {
		get: function(id) {
			return new Promise(function(resolve, reject) {
				this.findById(id).exec(function(err, record) {
					if (err) return reject(err);
					if (!record) return reject(new errors.RecordNotFound());
					resolve(record);
				});
			}.bind(this));
		},

		//TODO Create this function
		getAll: function() {
			return;
		},

		//TODO Create this function
		getAllForDate: function(date) {
			return;
		},

		//TODO Create this function
		getAllForUser: function(user) {
			return;
		},

		//TODO Create this function
		getTotalMakeupMinutes: function(user) {
			return;
		}

	};

	var AttendanceRecords = connection.model("AttendanceRecords", Schema);
	return AttendanceRecords;
};