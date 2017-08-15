'use strict';

const listAllTasks = require('./queries/list-all-tasks');

module.exports = ({ store }) => listAllTasks({ store });
