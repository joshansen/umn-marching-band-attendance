var mongoose = require("mongoose");
var logger = require("logfmt");
var timestamps = require("mongoose-timestamps");
var Promise = require("promise");


module.exports = function createEventsModel(connection){

	var Schema = mongoose.Schema({
		createdByUser: { type: String, required: true},
		createdByHref: { type: String, required: true},
		name: { type: String, required: true },
		startDateTime: { type: Date, required: true },
		endDateTime: { type: Date, required: true },
		description: { type: String },
		type: { type: String, required: true, match: /required|make up/ },
		deleted: {type: Boolean, required: true, default: false}

	});

	Schema.plugin(timestamps);

	Schema.set('toJSON');

	Schema.statics = {
		//supports for url query string: date range, createdByHref, createdByName, type, deleted and id
		list: function(queryArray) {
			return new Promise(function(resolve, reject){
				this.find(createQuery(queryArray)).exec(function(err, records){
					if(err) return reject(records);
					return resolve(records);
				});
			}.bind(this));

			function createQuery(queryArray){
				if(queryArray.length === 0) return {};

				var querys = ["startDateLessThan", "startDateGreaterThan", "createdByUser", "createdByHref", "type", "id", "deleted"];
				var query = {};
				var keys = objectKeys(queryArray);

				if(keys.indexOf("startDateLessThan") != -1 && keys.indexOf("startDateGreaterThan") != -1) {
					query["startDateTime"] = {"$gt": queryArray["startDateGreaterThan"], "$lt":queryArray["startDateLessThan"]};
				}
				else if(keys.indexOf("startDateLessThan") != -1){
					query["startDateTime"] = {"$lt":queryArray["startDateLessThan"]};
				}
				else if(keys.indexOf("startDateGreaterThan") != -1){
					query["startDateTime"] = {"$gt": queryArray["startDateGreaterThan"]};
				}
				if(keys.indexOf("createdByUser") != -1) query["createdByUser"] = queryArray["createdByUser"];
				if(keys.indexOf("createdByHref") != -1) query["createdByHref"] = queryArray["createdByHref"];
				if(keys.indexOf("type") != -1) query["type"] = queryArray["type"];
				if(keys.indexOf("id") != -1) query["_id"] = queryArray["id"];
				if(keys.indexOf("deleted") != -1) query["deleted"] = queryArray["deleted"];

				return query;

				function objectKeys(obj){
				  	var keys = [];
				  	for(var key in obj){
				    	keys.push(key);
				  	}
				  	return keys;
				}
			}
		},

		update: function(id, json) {
			return new Promise(function(resolve, reject){
				this.findOne({"_id":id}, function(err, record){
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

		//TODO add functionality to deal with one failing, etc.
		create: function(json, creatorFullName, creatorHref) {
			return new Promise(function(resolve, reject){
				if(json instanceof Array){
					json.forEach(function(val){
						val["createdByUser"] = creatorFullName;
						val["createdByHref"] = creatorHref;
					});
				}
				else{
					json["createdByUser"] = creatorFullName;
					json["createdByHref"] = creatorHref;
				}

				this.create(json, onSave);

				function onSave(err, records) {
					if (err) {
						logger.log({ type: 'error', msg: 'could not save', error: err });
						return reject(err);
					}
					logger.log({ type: 'info', msg: 'saved event(s)'});
					return resolve(records);
				}

			}.bind(this));
		},

	};

	var Events = connection.model("Events", Schema);
	return Events;
};