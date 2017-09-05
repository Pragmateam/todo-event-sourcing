const expect = require('expect.js');
const CreateTask = require('./create-task');

function fakeClock() {
  return {
    toISOString: () => '2017-07-19T03:55:26.055Z'
  };
}

describe('Commands - Create task', () => {
  it('creates a new task', () => {
    const state = {};
    const uuid = '1';
    const createTask = CreateTask(fakeClock);

    const result = createTask({
      state,
      attributes: {
        uuid,
        description: 'Buy fresh milk'
      }
    });

    result.fold(null, value =>
      expect(value).to.eql({
        name: 'TASK_CREATED',
        date: '2017-07-19T03:55:26.055Z',
        attributes: {
          uuid,
          description: 'Buy fresh milk'
        }
      })
    );
  });
});
