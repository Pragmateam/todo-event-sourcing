'use strict';

module.exports = (Clock = Date) => ({ state, attributes }) => {
  return {
    name: 'TASK_DONE',
    date: new Clock().toISOString(),
    attributes: {
      uuid: attributes.uuid
    }
  };
};
