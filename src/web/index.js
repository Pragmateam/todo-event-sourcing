'use strict';

const express = require('express');
const container = express();
const app = require('./app');
const InMemoryStore = require('../event-store/in-memory');

const store = new InMemoryStore();

const core = require('../core')(store);

container.use('/', app(core));

const port = 3000;

container.listen(port, err => {
  if (err) return reject(err);

  console.log(`Express container listening on port ${port}`);
});
