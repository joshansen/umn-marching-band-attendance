var express = require("express");
var stormpath = require("express-stormpath");
var bodyParser = require("body-parser");
var favicon = require("serve-favicon");
var path = require("path");
var compression = require("compression");

var errors = require("./errors");
var logs = require("./logs");
var router = require("./router");

module.exports = function Web(app, config){
	var web = express();

	var icon = path.join(__dirname, "public", "favicon.ico");
	var errs = errors(config.verbose);

	web.set("views", "./views")
		.set("view engine", "jade")
		.use(compression())
		.use(favicon(icon))
		.use(logs(config.verbose))
		.use(bodyParser.json())
		.use(bodyParser.urlencoded({ extended: true }));

	web.use(stormpath.init(web, {
		apiKeyId:     config.stormpath_api_key_id,
		apiKeySecret: config.stormpath_api_key_secret,
		secretKey:    config.stormpath_secret_key,
		application:  config.stormpath_url,
		expandCustomData: true
	}));

	// web.use(errs.notFound)
	//   .use(errs.log)
	//   .use(errs.json)
	//   .use(errs.html);


	web.use(router(web));

	return web;
};