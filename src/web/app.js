'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const controllers = require('./controllers');

module.exports = core => {
  const app = express();
  app.use(bodyParser.json());
  app.post('/task', controllers.createTask(core));
  return app;
};
