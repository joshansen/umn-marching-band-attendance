var logger = require("logfmt");
var EventEmitter = require("events").EventEmitter;

var connections = require("./connections");
var AttendanceRecordsModel = require("./models/attendance-records");
var AbsenceRequestsModel = require("./models/absence-requests");
var EventsModel = require("./models/events");
var BandMemberModel = require("./models/band-members");

function App(config) {
	EventEmitter.call(this);

	this.config = config;
	this.connections = connections(config.mongo_url);
	this.connections.once("ready", this.onConnected.bind(this));
	this.connections.once("lost", this.onLost.bind(this));
}


module.exports = function createApp(config){
	return new App(config);
};

App.prototype = Object.create(EventEmitter.prototype);

App.prototype.onConnected = function() {
	this.AttendanceRecords = AttendanceRecordsModel(this.connections.db);
	this.AbscenceRequests = AbsenceRequestsModel(this.connections.db);
	this.Events = EventsModel(this.connections.db);
	this.BandMembers = BandMemberModel(this.connections.db);
	this.onReady();
};

App.prototype.onReady = function() {
	logger.log({ type: "info", msg: "app.ready" });
	this.emit("ready");
};

App.prototype.onLost = function() {
	logger.log({ type: "info", msg: "app.lost" });
	this.emit("lost");
};

App.prototype.listEvents = function(queryArray) {
	return this.Events.list(queryArray);
}

App.prototype.updateEvent = function(id, json) {
	return this.Events.update(id, json);
}

App.prototype.addEvents = function(json) {
	return this.Events.add(json);
}