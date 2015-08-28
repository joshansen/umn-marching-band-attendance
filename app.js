var logger = require("logfmt");
var EventEmitter = require("events").EventEmitter;

var connections = require("./connections");

function App(config) {
  EventEmitter.call(this);

  this.config = config;
  this.connections = connections(config.mongo_url);
  this.connections.once("ready", this.onConnected.bind(this));
  this.connections.once("lost", this.onLost.bind(this));
}


module.exports = function createApp(config){
  return new App(config);
}

App.prototype = Object.create(EventEmitter.prototype);

App.prototype.onConnected = function() {
  //this.Article = ArticleModel(this.connections.db);
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