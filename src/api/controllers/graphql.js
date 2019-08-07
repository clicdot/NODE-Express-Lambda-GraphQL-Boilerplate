'use strict';

const graphqlHTTP = require('express-graphql');
const { schema } = require('../../schemas/graphqlSchemas');
const { root } = require('../../roots/graphqlRoots');

const graphql = (router) => {
  /**
   * @swagger
   * /:
   *    get:
   *      description: root
   */
  router.get('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }));

  router.post('/', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }));

  return router;
};

module.exports = graphql;
