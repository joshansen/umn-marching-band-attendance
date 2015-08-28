var mongoose = require("mongoose");
var logger = require("logfmt");
var timestamps = require("mongoose-timestamps");
var Promise = require("promise");

module.exports = function createBandMembersModel(connection){

	var Schema = mongoose.Schema({
		userHref: { type: String },
		name: { type: String, required: true },
		email: { type: String, required: true },
		section: { type: String, required: true },
		part: { type: String, required: true },
		role: { type: String, required: true }
	});

	Schema.plugin(timestamps);

	Schema.statics = {
		createUser: function(memberId, role){

		},

		getByUser: function (userHref){

		}

	};

	Schema.methods = {

	};

	var BandMembers = connection.model("BandMembers", Schema);
	return BandMembers;
};