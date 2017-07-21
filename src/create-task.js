module.exports = (Clock = Date, UUIDGenerator) => ({ state, attributes }) => {
  return {
    name: "TASK_CREATED",
    date: new Clock().toISOString(),
    attributes: {
      uuid: UUIDGenerator(),
      description: attributes.description
    }
  };
};
