'use strict';

// This file contains code that we reuse
// between our tests.

const express = require('express');
// const fp = require('fastify-plugin');
const App = require('../../../src/api/v1/routes');

const { beforeEach, tearDown } = require('tap');

let client;

beforeEach(async function () {

});

tearDown(async function () {
  if (client) {
    client = null;
  }
});

// automatically build and tear down our instance
const build = (t) => {
  const app = express();

  // fastify-plugin ensures that all decorators
  // are exposed for testing purposes, this is
  // different from the production setup
  // app.register(fp(App), config());
  // app.use('/', App);
  // const app = App;
  app.use('/api/v1', App);
  // app.use('/', require('./controllers/root.test'));

  // tear down our app after we are done
  t.tearDown(app.close);

  return app;
};

module.exports = { build };
