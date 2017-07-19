const expect = require('expect.js');

const fakeUUIDGenerator = () => '1'

function fakeClock() {
  return {
    toISOString: () => '2017-07-19T03:55:26.055Z'
  }
}

function CreateTask(Clock = Date, UUIDGenerator) {
  return function({state, attributes}){
    return {
      name: 'TASK_CREATED',
      date: new Clock().toISOString(),
      attributes: {
        uuid: UUIDGenerator(),
        description: attributes.description
      }
    }
  };
}

describe('Create task', function() {
  it('creates a new task', () => {
    createTask = CreateTask(fakeClock, fakeUUIDGenerator);

    const event = createTask({state: {}, attributes: {description: 'Buy fresh milk'}});
    expect(event).to.eql({
      name: 'TASK_CREATED',
      date: '2017-07-19T03:55:26.055Z',
      attributes: {
        uuid: '1',
        description: 'Buy fresh milk'
      }
    });
  })
});
