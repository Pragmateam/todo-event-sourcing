const expect = require('expect.js');
const ListAllTasks = require('./list-all-tasks');
const CreateTask = require('./../create-task');
const InMemoryStore = require('../../event-store/in-memory');

const uuidGenerator = () => '1';

describe('Query - List All Tasks', () => {
  it('lists new tasks', () => {
    const store = new InMemoryStore();

    const createTask = CreateTask({ store, uuidGenerator });
    const listAllTasks = ListAllTasks({ store });

    createTask({ description: 'Buy Milk' });
    createTask({ description: 'Buy Bread' });

    const uuid = '1';

    expect(listAllTasks()).to.eql([
      { uuid, description: 'Buy Milk' },
      { uuid, description: 'Buy Bread' }
    ]);
  });
});
