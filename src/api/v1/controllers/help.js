/* eslint new-cap: "error" */
'use strict';

/**
 * @swagger
 * /help:
 *    get:
 *      description: root
 */
const root = (router) => {
  router.get('/help', async (request, reply, next) => {
    reply.send({ test: 'Help - V1 - get' });

    // next();
  });
  return router;
};

module.exports = root;
