'use strict';

const express = require('express');
const router = express.Router();
const controllers = require('./controllers');

router.post('/task', controllers.createTask);

module.exports = router;
