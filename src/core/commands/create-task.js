'use strict';

module.exports = (Clock = Date) => ({ attributes }) => {
  return {
    name: 'TASK_CREATED',
    date: new Clock().toISOString(),
    attributes: {
      uuid: attributes.uuid,
      description: attributes.description
    }
  };
};
