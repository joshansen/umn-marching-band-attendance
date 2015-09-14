var mongoose = require("mongoose");
var logger = require("logfmt");
var timestamps = require("mongoose-timestamps");
var Promise = require("promise");
var Password = require("node-password").Password;

module.exports = function createBandMembersModel(connection, app){

	var Schema = mongoose.Schema({
		createdByUser: { type: String, required: true},
		createdByHref: { type: String, required: true},
		userHref: { type: String },
		name: { type: String, required: true },
		email: { type: String, required: true },
		//Add validation for sections, include staff
		section: { type: String, required: true },
		part: { type: String, required: true },
		//Add validation for roles
		role: { type: String, required: true }
	});

	Schema.plugin(timestamps);

	Schema.statics = {
		createMembers: function(json, creatorFullName, creatorHref, stormapp){
			var mongooseThis = this;
			//make loop over array
			var account = {
				givenName: json.givenName,
				surname: json.surname,
				email: json.email,
				password: (new Password).toString()
			};

			var record = {
				name: json.givenName + " " + json.surname,
				email: json.email,
				createdByUser: creatorFullName,
				createdByHref: creatorHref,
				section: json.section,
				part: json.part,
				role: json.role
			};

			//save record to database
			return new Promise(function(resolve, reject){
				stormapp.createAccount(account, function(err, acc) {
		      if (err) {
		       	logger.log({error: "Error creating stormpath account: " + err.developerMessage});
		       	return reject(acc);
		      }
		      else {
		      	logger.log({success: "Account created for: " + acc.fullName});

		        record.userHref = acc.href;
		        //addToGroup must be supplied an href. Don't use record.role instead lookup href.
		        acc.addToGroup( record.role, function(err, membership){
		        	if(err){
		        		logger.log({error: "Error adding stormpath account to group: " + err});
		       		return reject(acc);
		        	}
		        	logger.log({success: "Account for " + acc.fullName + " added to " + JSON.stringify(membership.group)});
		        	mongooseThis.create(record, onCreate);
		        })

		      }
		    });

		    function onCreate(err, records){
		    	if (err) {
						logger.log({ type: 'error', msg: 'could not save', error: err });
						return reject(err);
					}
					logger.log({ type: 'info', msg: 'saved event(s)'});
					return resolve(records);
		    }
			}.bind(this));
		},

		//should only allow to update some not all if it's an update self situation
		updateMember: function(userHref, json){
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

		getMember: function (userHref){
			return new Promise(function(resolve, reject){
				this.findOne({"userHref":userHref}).exec(function(err, records){
					if(err) return reject(records);
					return resolve(records);
				});
			}.bind(this));
		},

		listMembers: function (){
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