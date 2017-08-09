'use strict';

module.exports = function InMemoryStore(entries = []) {
  return {
    save: entry => entries.push(entry)
  };
};
