'use strict';

const root = (router) => {
  /**
   * @swagger
   * /:
   *    get:
   *      description: root
   */
  router.get('/', async (request, reply, next) => {
    reply.send({ test: 'Hello World - V1 - get' });

    // next();
  });

  /**
   * @swagger
   * /:
   *    post:
   *      description: root
   */
  router.post('/', async (request, reply, next) => {
    reply.send({ test: 'Hello World - V1 - post' });

    // next();
  });

  return router;
};

module.exports = root;
