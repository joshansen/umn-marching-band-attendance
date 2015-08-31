var mongoose = require("mongoose");
var logger = require("logfmt");
var timestamps = require("mongoose-timestamps");
var Promise = require("promise");

var Event = require("./events");
var AttendanceRecords = require("./attendance-records");

module.exports = function createAbsenceRequestsModel(connection){

	var Schema = mongoose.Schema({
		userHref: { type: String, required: true},
		requestedAbsences: [{
			event: { type: mongoose.Schema.Types.ObjectId, ref: 'Event', required: true },
			minutesMissed: { type: Number, default: 0, min: 0, required: true },
			minutesToMakeup: { type: Number, default: 0, min: 0, required: true },
			reasonForAbscence: { type: String, required: true }
		}],
		approved: { type: Boolean, default: false},
		attendanceRecordsCreated: [{ type: mongoose.Schema.Types.ObjectId, ref: 'AttendanceRecords' }]

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

		//TODO Create this function
		getAllForUser: function(user) {
			return;
		}

	};

	Schema.methods = {
		createAttendanceRecords: function(userId) {
			return;
		},

	};

	var AbsenceRequests = connection.model("AbsenceRequests", Schema);
	return AbsenceRequests;
};