var logger = require("logfmt");
var http = require("http");
var throng = require("throng");

var app = require("./app");
var web =require("./web");
var config = require("./config");

if (config.environment != "production") require("dotenv").load();


http.globalAgent.maxSockets = Infinity;
throng(start, { lifetime: Infinity});

function start() {
  logger.log({
    type: "info",
    msg: "starting server",
    //concurrency: config.concurrency
  });

  var instance = app(config);
  instance.on("ready", createServer);
  instance.on("lost", abort);

  function createServer() {
    var server = http.createServer(web(instance, config));

    process.on("SIGTERM", shutdown);
    instance
      .removeListener("lost", abort)
      .on("lost", shutdown);

    server.listen(config.port, onListen);

    function onListen() {
      logger.log({ type: "info", msg: "listening", port: server.address().port });
    }

    function shutdown() {
      logger.log({ type: "info", msg: "shutting down" });
      server.close(function() {
        logger.log({ type: "info", msg: "exiting" });
        process.exit();
      });
    }
  }

  function abort() {
    logger.log({ type: "info", msg: "shutting down", abort: true });
    process.exit();
  }
}