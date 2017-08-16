'use strict';
const Either = require('data.either');

module.exports = (Clock = Date) => ({ state, attributes }) => {
  // Usar predicado pra evitar o if /return abaixo
  if (!state.uuid) {
    return Either.Right('The task must exist!');
  }
  const event = {
    name: 'TASK_DONE',
    date: new Clock().toISOString(),
    attributes: {
      uuid: attributes.uuid
    }
  };
  return Either.Left(event);
};
