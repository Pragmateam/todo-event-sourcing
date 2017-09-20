'use strict';

module.exports = function InMemoryStore(entries = []) {
  const listeners = [];
  return {
    save: event => {
      entries.push(event);
      listeners
        .filter(listener => listener.eventName === event.name)
        .forEach(listener => listener.listener(event));
    },
    subscribe: (eventName, listener) => {
      if (entries.length) listener(entries);
      listeners.push({ eventName, listener });
    },
    load: ({uuid}) => entries.filter(entry => entry.attributes.uuid === uuid)
  };
};
