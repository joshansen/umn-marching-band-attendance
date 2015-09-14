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
		// function createAccount(req, res, form) {
		//   var view = req.app.get('stormpathRegistrationView');

		//   return function(account, callback) {
		//     req.app.get('stormpathApplication').createAccount(account, function(err, acc) {
		//       if (err) {
		//         helpers.render(view, res, { error: err.userMessage, form: form });
		//         req.app.get('stormpathLogger').info('A user tried to create a new account, but this operation failed with an error message: ' + err.developerMessage);
		//         callback(err);
		//       } else if (req.app.get('stormpathEnableAccountVerification') && acc.status === 'UNVERIFIED') {
		//         helpers.render(req.app.get('stormpathAccountVerificationEmailSentView'), res, { email: acc.email });
		//         callback();
		//       } else {
		//         req.stormpathSession.user = acc.href;
		//         res.locals.user = acc;
		//         req.user = acc;
		//         callback();
		//       }
		//     });
		//   };
		// }

		createMembers: function(json){
			return;
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