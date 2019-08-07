/* eslint new-cap: "error" */
'use strict';

/**
 * @swagger
 * /:
 *    get:
 *      description: root
 */
const root = (router) => {
  router.get('/', async (request, reply, next) => {
    reply.send({ test: 'Hello World - V2 - get' });

    // next();
  });

  router.post('/', async (request, reply, next) => {
    reply.send({ test: 'Hello World - V2 - post' });

    // next();
  });

  return router;
};

module.exports = root;
