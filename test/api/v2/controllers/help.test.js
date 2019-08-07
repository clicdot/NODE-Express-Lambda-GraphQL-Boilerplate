'use strict';

const test = require('tap').test;
const request = require('supertest');
// const app = require('../../../../src/app');
const { build } = require('../../../helper');

test('GET /api/v2/help', (assert) => {
  const app = build(assert);
  request(app)
    .get('/api/v2/help')
    .expect(200)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      var expectedThings = { test: 'Help - V2 - get' };
      var actualThings = res.body.data;

      assert.error(err, 'No error');
      assert.same(actualThings, expectedThings, 'Retrieve response');
      assert.end();
    });
});
