'use strict';

// This file contains code that we reuse
// between our tests.

// const express = require('express');
const App = require('../src/app');

const { beforeEach, tearDown } = require('tap');
const db = require('../src/plugins/dbconnector');

let client;

beforeEach(async function () {
  if (!client) {
    client = await db.get();
  }
});

tearDown(async () => {
  if (client) {
    await client.close;
    client = null;
  }
});

// automatically build and tear down our instance
function build (t) {
  const app = App;

  // t.tearDown(client.close);

  return app;
}

module.exports = { build };
