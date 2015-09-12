var mongoose = require("mongoose");
var logger = require("logfmt");
var timestamps = require("mongoose-timestamps");
var Promise = require("promise");

module.exports = function createBandMembersModel(connection){

	var Schema = mongoose.Schema({
		createdByUser: { type: String, required: true},
		createdByHref: { type: String, required: true},
		userHref: { type: String },
		name: { type: String, required: true },
		email: { type: String, required: true },
		section: { type: String, required: true },
		part: { type: String, required: true },
		role: { type: String, required: true }
	});

	Schema.plugin(timestamps);

	Schema.statics = {
		create: function(json){
			return;
		},

		//should only allow to update some not all if it's an update self situation
		update: function(userHref, json){
			return new Promise(function(resolve, reject){
				this.findOne({"userHref":userHref}, function(err, record){
					if(err) return reject(record);

					Object.keys(json).forEach(function(key){
						record[key] = json[key];
					});

					record.save(onUpdate);
				});

				function onUpdate(err, response){
					if(err) reject(record);
					resolve(response);
				}

			}.bind(this));
		},

		get: function (userHref){
			return new Promise(function(resolve, reject){
				this.findOne({"userHref":userHref}).exec(function(err, records){
					if(err) return reject(records);
					return resolve(records);
				});
			}.bind(this));
		},

		list: function (){
			return new Promise(function(resolve, reject){
				this.find({}).exec(function(err, records){
					if(err) return reject(records);
					return resolve(records);
				});
			}.bind(this));
		}

	};

	var BandMembers = connection.model("BandMembers", Schema);
	return BandMembers;
};