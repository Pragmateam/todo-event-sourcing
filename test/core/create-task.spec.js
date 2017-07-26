const expect = require('expect.js');
const CreateTask = require(`${global.SRC}/core/create-task`);

const fakeUUIDGenerator = () => '1';

function fakeClock() {
  return {
    toISOString: () => '2017-07-19T03:55:26.055Z'
  };
}

describe('Create task', () => {
  it('creates a new task', () => {
    const createTask = CreateTask(fakeClock, fakeUUIDGenerator);

    const event = createTask({
      state: {},
      attributes: { description: 'Buy fresh milk' }
    });

    expect(event).to.eql({
      name: 'TASK_CREATED',
      date: '2017-07-19T03:55:26.055Z',
      attributes: {
        uuid: '1',
        description: 'Buy fresh milk'
      }
    });
  });
});
