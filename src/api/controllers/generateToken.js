'use strict';

const jwt = require('jsonwebtoken');
const globals = require('../../helpers/globals');

const generateToken = (router) => {
  router.post('/token', (request, response, next) => {
    if (request.body.secret == null) {
      globals.sendError(request, response, 401, 'Authorization token is invalid: missing jwt secret');
      return;
    }
    // if (request.body.companyId == null) {
    //   globals.sendError(request, response, 401, ['Authorization token is invalid: missing companyId']);
    //   return;
    // }

    let token = {
      // companyId: request.body.companyId
    };
    let jwtToken = jwt.sign(token, request.body.secret);

    response.send({ accessToken: jwtToken });
  });

  return router;
};

module.exports = generateToken;
