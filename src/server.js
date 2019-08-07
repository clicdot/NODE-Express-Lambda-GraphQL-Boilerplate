'use strict';

require('./environment/env');
const app = require('./app');

app.listen(process.env.PORT, '0.0.0.0', (err, address) => {
  if (err) throw err;
  console.log(`server listening on ${process.env.PORT}`);
});
