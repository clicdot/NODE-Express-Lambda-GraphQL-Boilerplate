'use strict';

const { test } = require('tap');
// const app = require('../../../../src/app');
const { build } = require('../../../helper');
const request = require('supertest');

test('GET /api/v1', (assert) => {
  const app = build(assert);
  request(app)
    .get('/api/v1')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      var expectedThings = { test: 'Hello World - V1 - get' };
      var actualThings = res.body.data;

      assert.error(err, 'No error');
      assert.same(actualThings, expectedThings, 'Retrieve response');
      assert.end();
    });
});

test('POST /api/v1', (assert) => {
  const app = build(assert);
  request(app)
    .post('/api/v1')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      var expectedThings = { test: 'Hello World - V1 - post' };
      var actualThings = res.body.data;

      assert.error(err, 'No error');
      assert.same(actualThings, expectedThings, 'Retrieve response');
      assert.end();
    });
});
