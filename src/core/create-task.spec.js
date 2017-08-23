const expect = require('expect.js');
const CreateTask = require('./create-task');
const { Failure, Success } = require('data.validation');

function InMemoryStore(entries = []) {
  return {
    save: entry => entries.push(entry),
    eventNames: () => entries.map(e => e.name)
  };
}
const uuidGenerator = () => '1';

describe('Use Case - Create Task', () => {
  it('assigns a UUID to the new task', () => {
    const store = new InMemoryStore();
    const createTask = CreateTask({ store, uuidGenerator });
    const result = createTask({ description: 'Buy Milk' });

    result.fold(null, value => expect(value).to.equal('1'));
  });

  it('creates a new task', () => {
    const store = new InMemoryStore();
    const createTask = CreateTask({ store, uuidGenerator });
    createTask({ description: 'Buy Milk' });
    expect(store.eventNames()).to.eql(['TASK_CREATED']);
  });
});
