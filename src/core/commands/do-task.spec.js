const expect = require('expect.js');
const DoTask = require('./do-task');

function fakeClock() {
  return {
    toISOString: () => '2017-07-19T03:55:26.055Z'
  };
}

describe('Commands - Do task', () => {
  it('marks a task as done', () => {
    const uuid = '1';
    const state = { uuid };
    const doTask = DoTask(fakeClock);

    const result = doTask({
      state,
      attributes: {
        uuid
      }
    });

    result.fold(null, value =>
      expect(value).to.eql({
        name: 'TASK_DONE',
        date: '2017-07-19T03:55:26.055Z',
        attributes: {
          uuid
        }
      })
    );
  });

  it('requires task to exist', () => {
    const uuid = '1';
    const state = {};
    const doTask = DoTask(fakeClock);

    const result = doTask({
      state,
      attributes: {
        uuid
      }
    });

    result.fold(value => expect(value).to.eql(['The task must exist!']), null);
  });
});
