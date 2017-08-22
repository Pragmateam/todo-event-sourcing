'use strict';
const { validate } = require('predicado');
const { Success, Failure } = require('data.validation');

const validations = [
  {
    error: 'The task must exist!',
    predicate: state => Boolean(state.uuid)
  }
];

module.exports = (Clock = Date) => ({ state, attributes }) => {
  const createEvent = () =>
    Success({
      name: 'TASK_DONE',
      date: new Clock().toISOString(),
      attributes: {
        uuid: attributes.uuid
      }
    });

  return validate(validations, state).fold(Failure, createEvent);
};
