var express = require("express");
var logger = require("logfmt");

module.exports = function eventsController(app){

	return new express.Router()
		.get("/events", showEvents)
		.get("/events/:eventId", showEvent)
		.get("/api/event", listEvents)
		.post("/api/event", addEvents)
		.put("/api/event", updateEvent)

	function showEvents(req, res, next){
		res.render("events/show-events");
	}

	function showEvent(req, res, next){
		res.render("events/show-event", {"eventId": req.params.eventId});
	}

	function listEvents(req, res, next){
		app
			.listEvents(req.query)
			.then(sendList, next)

		function sendList(list){
			res.json(list);
		}
	}

	function updateEvent(req, res, next){
		app
			.updateEvent(req.query.id, req.body)
			.then(sendRecord, next)

		function sendRecord(response){
			res.json(response);
		}
	}

	function addEvents(req, res, next){
		app
			.addEvents(req.body, req.user.fullName, req.user.href)
			.then(sendRecords, next)

		function sendRecords(records){
			res.json(records)
		}
	}

};