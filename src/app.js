/* eslint new-cap: "error" */
'use strict';

const path = require('path');
const express = require('express');
const db = require('./plugins/dbconnector');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const swaggerUi = require('swagger-ui-express');
// const specs = require('./helpers/swaggerSpecs');
const app = express();
const preHook = require('express-res-hook');
const router = new express.Router();

const onSendMiddleware = require('./middleware/onSend');

const R = require('./helpers/response');

const swaggerDocument = require('./swagger/swagger20-with-extensions.json');

const options = {
  swaggerOptions: {
    validatorUrl: null
  }
};

// Connect to MySQL
db.connect();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

app.use(compression())
  .use(helmet())
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(awsServerlessExpressMiddleware.eventContext())
  .use(onSendMiddleware)

  .set('view engine', 'pug')

// NOTE: tests can't find the views directory without this
  .set('views', path.join(__dirname, 'views'))

  // Pre Hook
  .use(preHook((data, finish) => {
    // Your code, this will execute before sending response

    finish(data);
  }))

// Swagger Docs Endpoint
// .use('/swagger-ui-v1', swaggerUi.serve, swaggerUi.setup(specs.v1))
// .use('/swagger-ui-v2', swaggerUi.serve, swaggerUi.setup(specs.v2));

  // V1 API
  .use('/api/v1', require('./api/v1/routes'))

  // V2 API
  .use('/api/v2', require('./api/v2/routes'))

  .use('/auth', require('./api/controllers/generateToken')(router))

  .use('/graphql', require('./api/controllers/graphql')(router))

  .all('/*', (request, reply, next) => {
    const resp = new R();

    reply.statusCode = 404;
    resp.$init(request, reply);
    resp.$data([]);
    resp.$msg('errors', [
      'api endpoint is not valid'
    ]);

    reply.send(resp.$send());

    next();
  })
;

module.exports = app;
