'use strict';

const { test } = require('tap');
const request = require('supertest');
const app = require('../src/app');

// const db = require('../src/plugins/dbconnector');

const R = require('../src/helpers/response');
const uuidv4 = require('uuid/v4');

test('GET /*', (assert) => {
  request(app)
    .get('/test')
    .expect(404)
    .expect('Content-Type', /json/)
    .end((err, res) => {
      const { response } = res.body;

      assert.error(err, 'No error');
      assert.same(response.code, 404, 'Retrieve response code');
      assert.same(response.messages.errors[0], 'api endpoint is not valid', 'Retrieve response error message');
      assert.end();
    });
});

test('Response Handler', (assert) => {
  const res = new R();

  const ts = new Date();
  const uuid = uuidv4();

  const req = {
    raw: {
      method: 'GET',
      url: '/',
      ip: '127.0.0.1'
    },
    hostname: 'localhost',
    appVersion: 'v1'
  };

  const rep = {
    statusCode: 200
  };

  const set = {
    response: {
      code: null,
      id: null,
      timestamp: null,
      function: {},
      messages: {
        errors: [],
        warnings: [],
        infos: [
          'hello world'
        ]
      },
      test: []
    },
    data: []
  };

  res.$init(req, rep);

  res.$inject('timestamp', ts);
  res.$inject('id', uuid);
  res.$data(1);

  const response = res.$send();
  res.__deleteNulls(set);

  // console.log('TIMES', response);
  assert.equal(response.data, 1);
  assert.equal(response.response.code, 200);
  // assert.same(response.response.timestamp, ts, 'Timestamp');
  assert.ok(response.response.function.apiVersion);
  assert.equal(response.response.id, uuid);
  assert.end();
});
