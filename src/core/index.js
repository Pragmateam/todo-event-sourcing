const uuidGenerator = require('uuid/v4');

module.exports = store => ({
  createTask: require('./create-task')({ store, uuidGenerator })
});
