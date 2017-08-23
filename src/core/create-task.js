const CreateTask = require('./commands/create-task');
const { Success } = require('data.validation');

module.exports = ({ store, uuidGenerator }) => attributes => {
  const uuid = uuidGenerator();
  const createTask = CreateTask();
  const result = createTask({
    attributes: {
      uuid,
      description: attributes.description
    }
  });

  result.fold(
    () => {},
    event => {
      store.save(event);
    }
  );

  return Success(uuid);
};
