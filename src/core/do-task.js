const DoTask = require('./commands/do-task');

module.exports = ({ store }) => ({ uuid }) => {
  const doTask = DoTask();
  const state = store
    .load({ uuid })
    .reduce(
      (state, event) =>
        Object.assign({}, state, { uuid: event.attributes.uuid }),
      {}
    );

  const result = doTask({ state, attributes: { uuid } });

  return result.fold(result.Failure, () => {
    store.save({ name: 'TASK_DONE' });
  });
};
