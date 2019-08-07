'use strict';

const test = require('tap').test;
const request = require('supertest');
const app = require('../../../src/app');
// const { build } = require('../../helper');
// const auth = require('../../../src/middleware/auth');

const COMPANY_ID = 10697;

test('POST /auth/token - generate token without proper parameters', (assert) => {
  // const app = build(assert);

  request(app)
    .post('/auth/token')
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      const { response } = res.body;
      assert.error(err, 'No error');
      assert.same(response.code, 401, 'Failed to generate token');
      assert.ok(response.messages.errors, 'Errors exist');
      assert.same(response.messages.errors[0], 'Authorization token is invalid: missing jwt secret', 'Malformed json object');
      assert.end();
    });
});

test('POST /auth/token - generate token without proper parameters - no companyId', (assert) => {
  // const app = build(assert);

  request(app)
    .post('/auth/token')
    .send({ secret: 'someSecret' })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      const { response } = res.body;
      // console.log(response, data);
      assert.error(err, 'No error');
      assert.same(response.code, 401, 'Failed to generate token');
      assert.ok(response.messages.errors, 'Errors exist');
      assert.same(response.messages.errors[0], 'Authorization token is invalid: missing companyId', 'Malformed json object');
      assert.end();
    });
});

test('POST /auth/token - generate token without proper parameters - bad companyId', (assert) => {
  // const app = build(assert);

  request(app)
    .post('/auth/token')
    .send({
      secret: 'nzgkx9TA8s9EwXWcWPD824U6P22joTGrLqNmnPY7AT',
      companyId: COMPANY_ID
    })
    .expect('Content-Type', /json/)
    .expect(200)
    .end((err, res) => {
      const { response, data } = res.body;

      assert.error(err, 'No error');
      assert.same(response.code, 200, 'Failed to generate token proper token');

      assert.notOk(response.messages, 'Errors exist');
      assert.ok(data);
      assert.end();
    });
});

// test('POST /auth/token - generate token without proper parameters - bad companyId', (assert) => {
//   // const app = build(assert);

//   request(app)
//     .get('/api/v1/serviceTypes')
//     .timeout(2000)
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end((err, res) => {
//       const { response, data } = res.body;
//       assert.error(err, 'No error');
//       assert.same(response.code, 403, 'Failed to generate token proper token');
//       assert.ok(response.messages.errors, 'Errors exist');
//       assert.same(response.messages.errors[0], 'Unauthorized access: no authentication token specified', 'Unauthorized access');
//       assert.ok(data);
//       assert.end();
//     });
// });

// test('POST /auth/token - generate token without proper parameters - bad companyId', (assert) => {
//   // const app = build(assert);

//   request(app)
//     .get('/api/v1/serviceTypes')
//     .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiIiLCJpYXQiOjE1NjA2MzQwMjh9.huy4f3R67amVjhilIiiqIXrRyhAtr2RMl_962iu1bho')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end((err, res) => {
//       const { response, data } = res.body;
//       assert.error(err, 'No error');
//       assert.same(response.code, 401, 'Failed to generate token proper token');
//       assert.ok(response.messages.errors, 'Errors exist');
//       assert.same(response.messages.errors[0], 'Authorization token is invalid: missing companyId', 'Unauthorized access');
//       assert.ok(data);
//       assert.end();
//     });
// });

// test('POST /auth/token - generate token without proper parameters - bad companyId', (assert) => {
//   // const app = build(assert);

//   request(app)
//     .get('/api/v1/serviceTypes')
//     .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI3Njc2NzY3NzY2NyIsImlhdCI6MTU2MDYzNDIwM30.ZK3QeWyLnCFTjiY62u3sf2nWjoiLkinbXm-8YjQEzDA')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end((err, res) => {
//       const { response, data } = res.body;
//       assert.error(err, 'No error');
//       assert.same(response.code, 401, 'Failed to generate token proper token');
//       assert.ok(response.messages.errors, 'Errors exist');
//       assert.same(response.messages.errors[0], 'Authorization token is invalid: companyId does not exist', 'Unauthorized access');
//       assert.ok(data);
//       assert.end();
//     });
// });

// test('POST /auth/token - generate token without proper parameters - bad companyId', (assert) => {
//   // const app = build(assert);

//   request(app)
//     .get('/api/v1/serviceTypes')
//     .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiIxMDY5OCIsImlhdCI6MTU2MDYzNDM3OH0.Luh5BGVXv3F-YwzL4Kce2HVhDPtqtMd6HavhMmFVxb4')
//     .expect('Content-Type', /json/)
//     .expect(200)
//     .end((err, res) => {
//       const { response, data } = res.body;
//       assert.error(err, 'No error');
//       assert.same(response.code, 401, 'Failed to generate token proper token');
//       assert.ok(response.messages.errors, 'Errors exist');
//       assert.same(response.messages.errors[0], 'invalid signature', 'Unauthorized access');
//       assert.ok(data);
//       assert.end();
//     });
// });

// test('POST /auth/token - generate token without proper parameters - bad companyId', (assert) => {

// });

// test('POST /auth/token - generate token without proper parameters', async (assert) => {
//   assert.plan(6);

//   const noSecretResponse = await request(app)
//     .post('/auth/token')
//     .timeout(2000)
//     .expect('Content-Type', /json/)
//     .expect(200);

//   const noCompanyIdResponse = await request(app)
//     .post('/auth/token')
//     .timeout(2000)
//     .send({ secret: 'someSecret' })
//     .expect('Content-Type', /json/)
//     .expect(200);

//   assert.same(noSecretResponse.body.response.code, 401, 'Failed to generate token');
//   assert.ok(noSecretResponse.body.response.messages.errors, 'Errors exist');
//   assert.same(noSecretResponse.body.response.messages.errors[0], 'Authorization token is invalid: missing jwt secret', 'Malformed json object');

//   assert.same(noCompanyIdResponse.body.response.code, 401, 'Failed to generate token');
//   assert.ok(noCompanyIdResponse.body.response.messages.errors, 'Errors exist');
//   assert.same(noCompanyIdResponse.body.response.messages.errors[0], 'Authorization token is invalid: missing companyId', 'Malformed json object');

//   assert.end();
// });

// test('POST /auth/token - test endpoint with missing token OR with missing / invalid company Id', async (assert) => {
//   assert.plan(9);

//   const goodTokenWithNoCompanyResponse = await request(app)
//     .get('/api/v1/serviceTypes')
//     .timeout(2000)
//     .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NTk2NTE3NDl9.OYQhIAOS-CyBhhE1DGqXMkzBKwxW5YXBeFDtjPk_SLY')
//     .expect('Content-Type', /json/)
//     .expect(200);

//   const goodTokenWithWrongCompanyIdResponse = await request(app)
//     .get('/api/v1/serviceTypes')
//     .timeout(2000)
//     .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiI1NTU3Nzk5OTg4Nzc4NSIsImlhdCI6MTU1OTY1MTc0OX0.Zzd2iEMVWcZdP3NJ0n2gAq62MfvqWzbgzx2924SKlPs')
//     .expect('Content-Type', /json/)
//     .expect(200);

//   const noTokenApiCall = await request(app)
//     .get('/api/v1/serviceTypes')
//     .timeout(2000)
//     .expect('Content-Type', /json/)
//     .expect(200);

//   assert.same(goodTokenWithNoCompanyResponse.body.response.code, 401);
//   assert.ok(goodTokenWithNoCompanyResponse.body.response.messages.errors[0], 'Errors exist');
//   assert.same(goodTokenWithNoCompanyResponse.body.response.messages.errors[0], 'Authorization token is invalid: missing companyId', 'Missing Company ID');

//   assert.same(goodTokenWithWrongCompanyIdResponse.body.response.code, 401);
//   assert.ok(goodTokenWithWrongCompanyIdResponse.body.response.messages.errors[0], 'Errors exist');
//   assert.same(goodTokenWithWrongCompanyIdResponse.body.response.messages.errors[0], 'Authorization token is invalid: companyId does not exist', 'Invalid Company ID');

//   assert.same(noTokenApiCall.body.response.code, 403, 'Unauthorized');
//   assert.ok(noTokenApiCall.body.response.messages.errors, 'Errors exist');
//   assert.same(noTokenApiCall.body.response.messages.errors[0], 'Unauthorized access: no authentication token specified', 'Unauthorized access');

//   assert.end();
// });

// test('POST /auth/token - generate token with wrong secret and test endpoint', async (assert) => {
//   assert.plan(12);

//   const wrongTokenResponse = await request(app)
//     .post('/auth/token')
//     .timeout(2000)
//     .send({ secret: 'some_wrong_secret', companyId: COMPANY_ID })
//     .expect('Content-Type', /json/)
//     .expect(200);

//   const jwtMalformedApiCall = await request(app)
//     .get('/api/v1/serviceTypes')
//     .timeout(2000)
//     .set('Authorization', 'Bearer wrong_token')
//     .expect('Content-Type', /json/)
//     .expect(200);

//   const invalidTokenApiCall = await request(app)
//     .get('/api/v1/serviceTypes')
//     .timeout(2000)
//     .set('Authorization', 'Bearer yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb21wYW55SWQiOiIxMDY5NyIsImlhdCI6MTU1OTU3MDYyMX0.2t9mqGppqIQ3cHCYpp5y9uUaX4vHEnXPDNc76viwTWE')
//     .expect('Content-Type', /json/)
//     .expect(200);

//   const wrongCredentialsApiCall = await request(app)
//     .get('/api/v1/serviceTypes')
//     .timeout(2000)
//     .set('Authorization', 'Bearer ' + wrongTokenResponse.body.data.accessToken)
//     .expect('Content-Type', /json/)
//     .expect(200);

//   assert.same(wrongTokenResponse.body.response.code, 200);
//   assert.ok(wrongTokenResponse.body.data.accessToken, 'Access token generated');
//   assert.notOk(wrongTokenResponse.body.response.messages.errors, 'Errors exist');

//   assert.same(jwtMalformedApiCall.body.response.code, 401, 'Unauthorized');
//   assert.ok(jwtMalformedApiCall.body.response.messages.errors[0], 'Errors exist');
//   assert.same(jwtMalformedApiCall.body.response.messages.errors[0], 'jwt malformed', 'JWT malformed');

//   assert.same(invalidTokenApiCall.body.response.code, 401, 'Unauthorized');
//   assert.ok(invalidTokenApiCall.body.response.messages.errors[0], 'Errors exist');
//   assert.same(invalidTokenApiCall.body.response.messages.errors[0], 'invalid token', 'Invalid token');

//   assert.same(wrongCredentialsApiCall.body.response.code, 401, 'Unauthorized');
//   assert.ok(wrongCredentialsApiCall.body.response.messages.errors[0], 'Errors exist');
//   assert.same(wrongCredentialsApiCall.body.response.messages.errors[0], 'invalid signature', 'Invalid signature');

//   assert.end();
// });
