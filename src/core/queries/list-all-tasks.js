'use strict';

module.exports = ({ store }) => {
  const tasks = [];

  store.subscribe('TASK_CREATED', event => {
    const { uuid, description } = event.attributes;
    tasks.push({ uuid, description });
  });

  // store.subscribe('TASK_DONE', event => {
  //   const { uuid, status } = event.attributes;
  //   const task = task.find(task => (task.uuid = uuid));
  //   task.status = status;
  // });

  return () => tasks.slice(0);
};
