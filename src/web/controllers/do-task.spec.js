'use strict';

const expect = require('expect.js');
const request = require('supertest');

const InMemoryStore = require('../../event-store/in-memory');
const store = new InMemoryStore();
const core = require('../../core')(store);

const app = require('../app')(core);

describe('Controller - Do Task', () => {
  it('returns ok', done => {
    request(app)
      .post('/task')
      .send({})
      .end((error, { body }) => {
        if (error) return done(error);

        request(app)
          .post(`/task/${body.uuid}/done`)
          .expect(200, done);
      });
  });

  it('returns not ok when task does not exist', done => {
    request(app)
      .post('/task/404/done')
      .expect(404, done);
  });
});
