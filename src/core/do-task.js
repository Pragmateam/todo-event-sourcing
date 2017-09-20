const DoTask = require('./commands/do-task');

module.exports = ({ store }) => ({ uuid }) => {
  const doTask = DoTask();
  const load = store.load({ uuid });

  const state = load.reduce((state, event) => {
    return Object.assign({}, state, { uuid: event.attributes.uuid });
  }, {});

  const result = doTask({ state, attributes: { uuid } });

  return result.fold(result.Failure, () => {
    store.save({ name: 'TASK_DONE', attributes: { uuid } });

    return new result.Success(true);
  });
};
