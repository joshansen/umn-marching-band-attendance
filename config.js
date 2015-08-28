module.exports = {

	port: process.env.PORT || 3000,
	mongo_url: process.env.MONGOLAB_URI || "mongodb://localhost:27017/appDev",

	verbose: process.env.VERBOSE || false,

  	stormpath_api_key_id: process.env.STORMPATH_API_KEY_ID,
 	stormpath_api_key_secret: process.env.STORMPATH_API_KEY_SECRET,
 	stormpath_secret_key: process.env.STORMPATH_SECRET_KEY,
 	stormpath_url: process.env.STORMPATH_URL,

 	environment: process.env.NODE_ENV || "devlopment"

};