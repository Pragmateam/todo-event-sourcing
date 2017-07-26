'use strict';

const app = require('./server');

const port = 3000;

app.listen(port, err => {
  if (err) return reject(err);

  console.log(`Express server listening on port ${port}`);
});
