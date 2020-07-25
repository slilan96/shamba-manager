const rateLimit = require('../../customHooks/rateLimiter');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [rateLimit({ tokensPerInterval: 5, interval: 'minute', method: 'create' })],
    update: [],
    patch: [],
    remove: [],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};
