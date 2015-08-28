var mongoose = require("mongoose");
var logger = require("logfmt");
var EventEmitter = require("events").EventEmitter;

function Connector(mongoUrl) {
  EventEmitter.call(this);

  var self = this;
  var readyCount = 0;

  this.db = mongoose.createConnection(mongoUrl)
    .on("connected", function() {
      logger.log({ type: "info", msg: "connected", service: "mongodb" });
      ready();
    })
    .on("error", function(err) {
      logger.log({ type: "error", msg: err, service: "mongodb" });
    })
    .on("close", function(str) {
      logger.log({ type: "error", msg: "closed", service: "mongodb" });
    })
    .on("disconnected", function() {
      logger.log({ type: "error", msg: "disconnected", service: "mongodb" });
      lost();
    });

  function ready() {
      self.emit("ready");
  }

  function lost() {
    self.emit("lost");
  }
}

Connector.prototype = Object.create(EventEmitter.prototype);

module.exports = function(mongoUrl) {
  return new Connector(mongoUrl);
};
