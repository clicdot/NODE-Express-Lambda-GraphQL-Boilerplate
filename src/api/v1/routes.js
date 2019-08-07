'use strict';

const router = require('express').Router();
const preHook = require('express-res-hook');
const loader = require('../../helpers/autoloader');

router.use(preHook((data, finish) => {
  // Your code, this will execute before sending response

  finish(data);
}))
  .use((request, reply, next) => {
    request.appVersion = 'v1';

    reply.on('close', () => {

    });

    next();
  });

loader([__dirname, '/controllers/'], router);

module.exports = router;
