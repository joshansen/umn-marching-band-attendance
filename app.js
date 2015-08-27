var express = require('express');
var stormpath = require('express-stormpath');
var bodyParser = require('body-parser');
var favicon = require('serve-favicon');
var path = require('path');
var compression = require('compression');
var logger = require('logfmt');
var http = require('http');
var throng = require('throng');

var errors = require('./errors');
var logs = require('./logs');
var config = require("./config");
var router = require("./router");








http.globalAgent.maxSockets = Infinity;
throng(start, { lifetime: Infinity });

function start() {
  logger.log({
    type: 'info',
    msg: 'starting server',
    concurrency: config.concurrency
  });

  var instance = new App(config);
  instance.on('ready', createServer);
  instance.on('lost', abort);

  function createServer() {
    var server = http.createServer(web(instance, config));

    process.on('SIGTERM', shutdown);
    instance
      .removeListener('lost', abort)
      .on('lost', shutdown);

    server.listen(config.port, onListen);

    function onListen() {
      logger.log({ type: 'info', msg: 'listening', port: server.address().port });
    }

    function shutdown() {
      logger.log({ type: 'info', msg: 'shutting down' });
      server.close(function() {
        logger.log({ type: 'info', msg: 'exiting' });
        process.exit();
      });
    }
  }

  function abort() {
    logger.log({ type: 'info', msg: 'shutting down', abort: true });
    process.exit();
  }
}







function App(config) {
  EventEmitter.call(this);

  this.config = config;
  this.connections = connections(config.mongo_url);
  this.connections.once('ready', this.onConnected.bind(this));
  this.connections.once('lost', this.onLost.bind(this));
}

App.prototype = Object.create(EventEmitter.prototype);

App.prototype.onConnected = function() {
  //this.Article = ArticleModel(this.connections.db);
  this.onReady();
};

App.prototype.onReady = function() {
  logger.log({ type: 'info', msg: 'app.ready' });
  this.emit('ready');
};

App.prototype.onLost = function() {
  logger.log({ type: 'info', msg: 'app.lost' });
  this.emit('lost');
};








function web(app, config){
  var web = express();

  var icon = path.join(__dirname, 'public', 'favicon.ico');
  var errs = errors(config.verbose);

  web.set('views', './views')
    .set('view engine', 'jade')
    .use(compression())
    .use(favicon(icon))
    .use(logs(config.verbose))
    .use(bodyParser.json())
    .use(bodyParser.urlencoded({ extended: true }));

  web.use(stormpath.init(app, {
    apiKeyId:     config.stormpath_api_key_id,
    apiKeySecret: config.stormpath_api_key_secret,
    secretKey:    config.stormpath_secret_key,
    application:  config.stormpath_url,
    expandCustomData: true
  }));

  web.use(errs.notFound)
    .use(errs.log)
    .use(errs.json)
    .use(errs.html);

  web.use(router(app));
}