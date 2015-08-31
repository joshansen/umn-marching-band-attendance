var express = require("express");

module.exports = function eventsController(app){

	return new express.Router()
		.get("/events", showEvents)
		.get("/events/:eventId", showEvent)
		.get("/api/event.json", listEvents)
		.post("/api/event", addEvents)
		.put("/api/event/:eventId", updateEvent)

	function showEvents(req, res, next){
		res.render("events/show-events");
	}

	function listEvents(req, res, next){
		app
			.listEvents(req.query)
			.then(sendList, next)

		function sendList(list){
			res.json(list);
		}

	}

	function showEvent(req, res, next){
		res.render("events/show-event", {"eventId": req.params.eventId});
	}

	function updateEvent(req, res, next){
		app
			.updateEvent(req.params.eventId, req.body)
			.then(sendRecord, next)

		function sendRecord(response){
			res.json(response);
		}

	}

	function addEvents(req, res, next){
		app
			.addEvents(req.body)
			.then(sendRecords, next)

		function sendRecords(records){
			//send json or send link to json???
			res.json(records)
		}
	}

};