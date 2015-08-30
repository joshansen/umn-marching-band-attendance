var express = require("express");

module.exports = function eventsController(app){

	return new express.Router()
		.get("/events", showEvents)
		.get("/events/:eventId", showEvent)
		//should I include parameters or things to do only certain date ranges or types? Limit event number? Etc.
		.get("/api/event.json", listEvents)
		//remove when list supports id query param
		.get("/api/event/:eventId.json", getEvent)
		.post("/api/event", addEvents)
		.put("/api/event/:eventId", updateEvent);

	function showEvents(req, res, next){
		res.render("events/show-events");
	}

	function listEvents(req, res, next){
		app
			.listEvents()
			.then(sendList, next)

		function sendList(list){
			res.json(list);
		}

	}

	function showEvent(req, res, next){
		res.render("events/show-event", {"eventId": req.params.eventId});
	}

	//remove when list supports id query param
	function getEvent(req, res, next){
		app
			.getEvent(req.params.eventId)
			.then(sendEvent, next)

		function sendEvent(event){
			res.json(event)
		}
	}

	function updateEvent(req, res, next){
		app
			.updateEvent(req.params.eventId, req.body)
			.then(render, next)

		function render(event){
			res.render("events/show-event", {"event": event});
		}

	}

	function addEvents(req, res, next){
		app
			.addEvents(req.body)
			.then(sendEvents, next)

		function sendEvents(event){
			//send json or send link to json???
			res.json(event)
		}
	}

};