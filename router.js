var express = require("express");
var path = require("path");
var stormpath = require("express-stormpath");
var logger = require("logfmt");

var profile = require("./controllers/profile");
var events = require("./controllers/events");

module.exports = function (app){
	return new express.Router()
		.get("/",  showHome)
		.use("/profile", stormpath.loginRequired, profile())
		//add in differentiated requirements for creating/ updating vs. viewing
		.use("/", stormpath.loginRequired, events(app))
		.use("/public", express.static("public"));

	function showHome(req, res, next){
		res.render("home", {title: "Welcome"});
	}
};