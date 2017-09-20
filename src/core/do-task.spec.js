const expect = require('expect.js');
const Core = require('./');
const DoTask = require('./do-task');

function InMemoryStore(entries = []) {
  return {
    save: entry => entries.push(entry),
    eventNames: () => entries.map(e => e.name),
    load: () => entries.slice(0)
  };
}

const uuidGenerator = () => '1';

describe('Use Case - Do Task', () => {
  it('sets the task as done', () => {
    const store = new InMemoryStore();
    const { value: uuid } = Core(store).createTask({ description: 'Buy Milk' });

    const doTask = DoTask({ store });
    doTask({ uuid });
    const taskDoneEvent = store.load().pop();

    expect(taskDoneEvent).to.eql({
      name: 'TASK_DONE',
      attributes: {
        uuid
      }
    });

    expect(store.eventNames()).to.eql(['TASK_CREATED', 'TASK_DONE']);
  });

  describe('Upon failures', () => {
    it('does not save any events', () => {
      const store = new InMemoryStore();
      const doTask = DoTask({ store });
      doTask({ uuid: 'unknown' });
      expect(store.eventNames()).to.eql([]);
    });

    it('returns failure reasons', () => {
      const store = new InMemoryStore();
      const doTask = DoTask({ store });
      const result = doTask({ uuid: 'unknown' });

      result.fold(
        value => expect(value).not.be.empty(),
        () => {
          throw new Error('value is not empty');
        }
      );
    });
  });
});
