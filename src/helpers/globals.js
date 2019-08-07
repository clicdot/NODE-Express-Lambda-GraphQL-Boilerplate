'use strict';

exports.sendError = (request, response, code, errors) => {
  const messages = {
    errors: Array.isArray(errors) ? errors : [errors],
    code: code
  };
  response.messages = messages;

  response.send(messages);
};
