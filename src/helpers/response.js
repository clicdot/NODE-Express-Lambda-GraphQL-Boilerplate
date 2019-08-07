'use strict';

const uuidv4 = require('uuid/v4');

const R = class {
  constructor () {
    this.responseTmp = {};
    this.responseEnv = {
      response: {
        code: null,
        id: null,
        timestamp: null,
        function: {},
        messages: {
          errors: [],
          warnings: [],
          infos: []
        }
      },
      data: []
    };

    this.responseTmp = JSON.parse(JSON.stringify(this.responseEnv));
  }

  $init (request, reply) {
    this.responseTmp.response.timestamp = new Date();
    this.responseTmp.response.code = reply.statusCode;
    this.responseTmp.response.id = uuidv4();
    this.responseTmp.response.function.method = request.method;
    this.responseTmp.response.function.url = request.baseUrl + request.url;
    this.responseTmp.response.function.ip = request.ip;

    if (request.hasOwnProperty('appVersion')) {
      this.responseTmp.response.function.apiVersion = request.appVersion;
    }
    this.__messageHandler(reply);
  }

  $inject (obj, value) {
    // this.__getKey(obj) ? this.responseTmp.response[this.__getKey(obj)] = value : this.responseTmp.response[obj] = value;
    this.responseTmp.response[obj] = value;
  }

  $send () {
    return this.__deleteNulls(this.responseTmp);
  }

  $data (data) {
    this.responseTmp.data = data;
  }

  $msg (type, msg) {
    this.responseTmp.response.messages[type] = msg;
  }

  // __getKey (object) {
  //   return Object.keys(this.responseTmp.response).find((key) => this.responseTmp.response[key] === object);
  // }

  __deleteNulls (object) {
    Object
      .entries(object)
      .forEach(([k, v]) => {
        if (v && typeof v === 'object') {
          this.__deleteNulls(v);
        }
        if ((v && typeof v === 'object' && !Object.keys(v).length) || v === null || v === undefined) {
          // if (Array.isArray(object)) {
          //   console.log('INSIDE', k, object);
          //   object.splice(k, 1);
          // } else {
          delete object[k];
          // }
        }
      });
    return object;
  }

  __messageHandler (msg) {
    // this.responseTmp.response.messages.push({ info: [msg] });
  }
};

module.exports = R;
