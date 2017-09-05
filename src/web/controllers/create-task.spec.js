'use strict';

const expect = require('expect.js');
const request = require('supertest');
const isUUID = require('isuuid');

const InMemoryStore = require('../../event-store/in-memory');
const store = new InMemoryStore();
const core = require('../../core')(store);

const app = require('../app')(core);

describe('Controller - Create Task', () => {
  it('creates a task', done => {
    request(app)
      .post('/task')
      .send({})
      .expect(201)
      .end(function(error, response) {
        const task = response.body;
        expect(isUUID(task.uuid)).to.be(true);
        done(error);
      });
  });
});
