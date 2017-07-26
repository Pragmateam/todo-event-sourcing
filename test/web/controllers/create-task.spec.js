'use strict';

const request = require('supertest');
const app = require(`${global.SRC}/web/server`);

describe('Controller - Create Task', () => {
  it('creates a task', () => request(app).post('/task').expect(201));
});
