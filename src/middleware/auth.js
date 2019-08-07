'use strict';

const jwt = require('jsonwebtoken');
// const globals = require('../helpers/globals');
// const db = require('../plugins/dbconnector');
// const queries = require('../queries/sql');

module.exports = async (request, reply, next) => {
  let runAuthCheck = true;
  const excludedRoutes = ['/auth/token', 'graphql'];
  const apiRoutes = ['/api/'];

  excludedRoutes.forEach((route) => {
    const path = request.path;
    if (path.includes(route) || !path.includes(apiRoutes)) {
      runAuthCheck = false;
    }
  });

  if (runAuthCheck) {
    if (request.headers.authorization && request.headers.authorization.startsWith('Bearer ')) {
      const authToken = request.headers.authorization.split(' ')[1];

      await jwt.verify(authToken, process.env.JWT_SECRET, async (err, decoded) => {
        if (err) {
          // return globals.sendError(request, reply, 401, err.message);
        } else {
        //   if (decoded.companyId === null || decoded.companyId === '') {
        //     // return globals.sendError(request, reply, 401, 'Authorization token is invalid: missing companyId');
        //   } else {
        //     // const response = await db.get().query(queries.sql().getCompanyExists, [decoded.companyId]);

        //     if (response.length) {
        //       request.companyId = decoded.companyId;
        //     } else {
        //       // return globals.sendError(request, reply, 401, 'Authorization token is invalid: companyId does not exist');
        //     }
        //   }
        }
      });
    }
  }
  next();
};
