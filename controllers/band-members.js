var express = require("express");
var logger = require("logfmt");

module.exports = function eventsController(app){

	return new express.Router()
		//Use member ID instead??
		.get("/band-members", showMembers)
		.get("/band-members/:memberId", showMember)
		.get("/api/band-members", listMembers)
		.post("/api/band-members", createMembers)
		.put("/api/band-members", updateMember)
		.get("/api/self", getSelf)
		.put("/api/self", updateSelf);

	function showMembers(req, res, next){
		res.render("members/show-members");
	}

	function showMember(req, res, next){
		res.render("members/show-member", {"memberId": req.params.memberId});
	}

	function listMembers(req, res, next){
		app
			.listMembers()
			.then(sendList, next);

		function sendList(list){
			res.json(list);
		}
	}

	function updateMember(req, res, next){
		app
			.updateMember(req.query.href, req.body)
			.then(sendRecord, next);

		function sendRecord(record){
			res.json(record);
		}
	}

	function createMembers(req, res, next){
		app
			.createMembers(req.body, req.user.fullName, req.user.href, req.app.get('stormpathApplication'))
			.then(sendRecords, next);

		function sendRecords(records){
			res.json(records);
		}
	}

	function getSelf(req, res, next){
		app
			.getMember(req.user.href)
			.then(sendRecord, next);

		function sendRecord(record){
			res.json(record);
		}
	}

	function updateSelf(req, res, next){
		app
			.updateMember(req.user.href, req.body)
			.then(sendRecord, next);

		function sendRecord(record){
			res.json(record);
		}
	}


};