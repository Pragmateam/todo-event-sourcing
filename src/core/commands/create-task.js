'use strict';
const { Success } = require('data.validation');

module.exports = (Clock = Date) => ({ attributes }) => {
  return Success({
    name: 'TASK_CREATED',
    date: new Clock().toISOString(),
    attributes: {
      uuid: attributes.uuid,
      description: attributes.description
    }
  });
};
