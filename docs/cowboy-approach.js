const { validate } = require('predicado');
const { Success, Failure } = require('data.validation');

// === EVENTS

const event = ({ name, aggregateUUID }, data) =>
  ({ name, aggregateUUID, data });const taskCreatedEvent = ({ aggregateUUID }, data) =>
  event({ name: 'TASK_CREATED', aggregateUUID }, data);

const taskDoneEvent = ({ aggregateUUID }, data) =>
  event({ name: 'TASK_DONE', aggregateUUID }, data);

// === COMMANDS

const createTask = (state, { uuid, name }) =>
  new Success(taskCreatedEvent({ uuid, name }));

const markTaskAsDone = (state, { uuid, date: Date.now() }) =>
  Validation(() => Boolean(state.uuid)).onSuccess(Succee)

// === REDUCERS
const taskReducers = {
  TASK_CREATED: (state, event) => Object.assign({}, state, { uuid: event.data.uuid, description: event.data.description }),
  TASK_DONE: (state, event) => Object.assign({}, state, { done: event.data.date })
};

// === USE CASES

const newUseCase = ({ store, command, reducers }, data) =>
  command(store.stream(uuid).reduce((state, event) => reducers[event.name](state, event), {}), data);

const createTaskUseCase = ({ store }, data) =>
  newUseCase({ store, command: createTask, reducers: taskReducers }, data);

const markTaskAsDoneUseCase = ({ store }, data) =>
  newUseCase({ store, command: markTaskAsDone, reducers: taskReducers }, data);

// === PROJECTIONS

const newShowAllTasks = ({ store }) => {
  let lastKnownDate = null;

  const reducers = {
    TASK_CREATED: (state, event) => Object.assign({}, state, { tasks: state.tasks.concat([event.data]) })
  };

  let state = store.fromDate(lastKnownDate).reduce((state, event) => reducers[event.name](state, event);

  store.on('TASK_CREATED', ({ data }) => {
    state = reducers['TASK_CREATED'](state, data);
    lastKnownDate = Date.now();
  });

  return () => state;
};

// ===
const showAllTasks = newShowAllTasks({ store });

app.get('/tasks', (req, res) => {
  res.send(showAllTasks());
});
