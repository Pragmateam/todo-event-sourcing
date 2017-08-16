const expect = require('expect.js');
const DoTask = require('./do-task');

function fakeClock() {
  return {
    toISOString: () => '2017-07-19T03:55:26.055Z'
  };
}

describe('Commands - Do task', () => {
  it('marks a task as done', done => {
    const uuid = '1';
    const state = { uuid };
    const doTask = DoTask(fakeClock);

    const either = doTask({
      state,
      attributes: {
        uuid
      }
    });

    const onSuccess = event => {
      expect(event).to.eql({
        name: 'TASK_DONE',
        date: '2017-07-19T03:55:26.055Z',
        attributes: {
          uuid
        }
      });
      done();
    };

    either.fold(onSuccess, done);
  });

  it('requires task to exist', done => {
    const uuid = '1';
    const state = {};
    const doTask = DoTask(fakeClock);

    const either = doTask({
      state,
      attributes: {
        uuid
      }
    });

    const onError = message => {
      expect(message).to.match(/must exist/);
      done();
    };

    either.fold(done, onError);
  });
});
