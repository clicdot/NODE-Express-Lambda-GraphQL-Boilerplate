'use strict';

const fs = require('fs');
const path = require('path');

const load = async (p, router) => {
  const routePath = path.join(p[0], p[1]);

  return fs.readdirSync(routePath).forEach((ctr) => {
    require(routePath + ctr)(router);
  });
};

module.exports = load;
