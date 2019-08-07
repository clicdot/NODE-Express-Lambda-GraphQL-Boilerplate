'use strict';

const mysql = require('mysql');
require('../environment/env');

const host = process.env.DB_HOST;
const user = process.env.DB_USERNAME;
const pass = process.env.DB_PASSWORD;
const data = process.env.DB_DATABASE;
const port = process.env.DB_PORT;

const state = {
  pool: null
};

exports.connect = () => {
  state.pool = mysql.createPool({
    host: host,
    user: user,
    password: pass,
    database: data,
    // socketPath: dbConfig.SOCKET,
    port: port
  });

  console.log('db connected');
};

exports.get = () => {
  return state.pool;
};
