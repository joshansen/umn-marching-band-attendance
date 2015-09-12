var express = require("express");
var logger = require("logfmt");

module.exports = function eventsController(app){

	return new express.Router()
		//Use member ID instead??
		.get("/band-members", showMembers)
		.get("/band-members/:memberId", showMember)
		.get("/api/band-members", listMembers)
		.post("/api/band-members", creaeMembers)
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
			.updateMember(req.query.id, req.body)
			.then(sendRecord, next);

		function sendRecord(response){
			res.json(response);
		}
	}

	function createMembers(req, res, next){
		app
			.createMembers(req.body, req.user.fullName, req.user.href)
			.then(sendRecords, next);

		function sendRecords(records){
			res.json(records);
		}
	}

	function getSelf(req, res, next){
		app
			.getMember()
			.then(sendList, next);

		function sendList(list){
			res.json(list);
		}
	}

	function updateSelf(req, res, next){
		app
			.updateMember(req.query.id, req.body)
			.then(sendRecord, next);

		function sendRecord(response){
			res.json(response);
		}
	}


};