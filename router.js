var express = require('express');
var path = require('path');

var profile = require("./controllers/profile");

module.exports = function (app){
	return new express.Router()
		.get('/',  showHome)
		.use('/profile',stormpath.loginRequired, profile())
		.use(express.static(path.join(__dirname, 'public')));

	function showHome(req, res, next){
		res.render('home', {title: 'Welcome'});
	}
};