'use strict';

const test = require('tap').test;
const request = require('supertest');
// const app = require('../../../../src/app');
const { build } = require('../../../helper');

test('GET /api/v2', (assert) => {
  const app = build(assert);
  request(app)
    .get('/api/v2')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      var expectedThings = { test: 'Hello World - V2 - get' };
      var actualThings = res.body.data;

      assert.error(err, 'No error');
      assert.same(actualThings, expectedThings, 'Retrieve response');
      assert.end();
    });
});

test('POST /api/v2', (assert) => {
  const app = build(assert);
  request(app)
    .post('/api/v2')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      var expectedThings = { test: 'Hello World - V2 - post' };
      var actualThings = res.body.data;

      assert.error(err, 'No error');
      assert.same(actualThings, expectedThings, 'Retrieve response');
      assert.end();
    });
});
