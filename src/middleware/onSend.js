'use strict';

const mung = require('express-mung');
const R = require('../helpers/response');

module.exports = mung.json(function transform (body, request, reply) {
  const resp = new R();
  resp.$init(request, reply);

  // handle errors
  if (body.hasOwnProperty('errors') || body.hasOwnProperty('warnings') || body.hasOwnProperty('infos') || body.hasOwnProperty('message')) {
    const keys = Object.keys(body);
    let i = 0; const iMax = keys.length;

    for (; i < iMax; i++) {
      if (keys[i] !== 'code') {
        resp.$msg(keys[i], body[keys[i]]);
      }
      if (keys[i] === 'code') {
        resp.$inject('code', body[keys[i]]);
      }
    }
    resp.$data([]);
  } else {
    resp.$data(body.data ? body.data : body);
  }

  return resp.$send();
});
