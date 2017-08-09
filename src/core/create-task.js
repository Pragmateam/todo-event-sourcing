const CreateTask = require('./commands/create-task');

module.exports = ({ store, uuidGenerator }) => attributes => {
  const uuid = uuidGenerator();
  const createTask = CreateTask();
  const event = createTask({
    attributes: {
      uuid,
      description: attributes.description
    }
  });
  store.save(event);
  return uuid;
};
