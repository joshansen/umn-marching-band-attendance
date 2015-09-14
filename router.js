var express = require("express");
var path = require("path");
var stormpath = require("express-stormpath");
var logger = require("logfmt");

var events = require("./controllers/events");
var bandMembers = require("./controllers/band-members");

module.exports = function (app){
	return new express.Router()
		.get("/",  showHome)
		//add in differentiated requirements for creating/ updating vs. viewing
		.use("/", stormpath.loginRequired, events(app))
		.use("/", stormpath.loginRequired, bandMembers(app))
		.use("/public", express.static("public"));

	function showHome(req, res, next){
		res.render("home", {title: "Welcome"});
	}
};