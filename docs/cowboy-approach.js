const { validate } = require('predicado');
const { Success, Failure } = require('data.validation');

// === EVENTS

const event = ({ name, aggregateUUID }, data) => ({
  name,
  aggregateUUID,
  data
});

const taskCreatedEvent = ({ aggregateUUID }, { uuid, description }) =>
  event({ name: 'TASK_CREATED', aggregateUUID }, { uuid, description });

const taskDoneEvent = ({ aggregateUUID }, data) =>
  event({ name: 'TASK_DONE', aggregateUUID }, data);

// === COMMANDS

const createTask = (_state, { uuid, description }) =>
  Success(taskCreatedEvent({ aggregateUUID: uuid }, { uuid, description }));

const markTaskAsDone = (state, { uuid, date = Date.now() }) =>
  Validation(() => Boolean(state.uuid)).onSuccess(Succee);

// === REDUCERS
const taskReducers = {
  TASK_CREATED: (state, event) =>
    Object.assign({}, state, {
      uuid: event.data.uuid,
      description: event.data.description
    }),
  TASK_DONE: (state, event) =>
    Object.assign({}, state, { done: event.data.date })
};

// // === USE CASES

const newUseCase = ({ store, command, reducers, aggregateUUID }, data) =>
  command(
    store
      .stream(aggregateUUID)
      .reduce((state, event) => reducers[event.name](state, event), {}),
    data
  ).fold(Failure, events => {
    store.save(events);
    return Success();
  });

const createTaskUseCase = ({ store, aggregateUUID }, { uuid, description }) =>
  newUseCase(
    { store, command: createTask, reducers: taskReducers, aggregateUUID },
    { description, uuid }
  );

const markTaskAsDoneUseCase = ({ store, aggregateUUID }, data) =>
  newUseCase(
    { store, command: markTaskAsDone, reducers: taskReducers, aggregateUUID },
    data
  );

// // === PROJECTIONS

const createShowAllTasks = ({ store }) => {
  let lastKnownDate = null;

  const reducers = {
    TASK_CREATED: (state, event) =>
      Object.assign({}, state, { tasks: state.tasks.concat([event.data]) })
  };

  let state = store
    .fromDate(lastKnownDate)
    .reduce((state, event) => reducers[event.name](state, event), {
      tasks: []
    });

  store.on('TASK_CREATED', ({ data }) => {
    state = reducers['TASK_CREATED'](state, data);
    lastKnownDate = Date.now();
  });

  return () => state;
};

// // ===

// app.get('/tasks', (req, res) => {
// res.send(showAllTasks());
// });

// =============================================================================

const createInMemoryStore = (data = []) => ({
  fromDate: () => data,
  save: events => (data = data.concat(events)),
  stream: uuid => data.filter(e => e.aggregateUUID === uuid),
  on(event, handler) {}
});

const expect = require('expect.js');

describe('projections', () => {
  describe('createShowAllTasks', () => {
    it('works', () => {
      const store = createInMemoryStore([
        taskCreatedEvent(
          { aggregateUUID: '123' },
          { uuid: '123', description: 'Buy Milk' }
        )
      ]);
      const showAllTasks = createShowAllTasks({ store });
      expect(showAllTasks()).to.eql({
        tasks: [{ uuid: '123', description: 'Buy Milk' }]
      });
    });
  });
});

describe('use cases', () => {
  describe('createTaskUseCase', () => {
    it('works', () => {
      const store = createInMemoryStore();

      createTaskUseCase(
        { store, aggregateUUID: '123' },
        { uuid: '123', description: 'Buy Milk' }
      );

      console.log(store.fromDate());
      expect(true).to.equal(true);
    });
  });
});
