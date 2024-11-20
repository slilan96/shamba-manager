const rateLimiter = require('../../hooks/rate-limiter');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      rateLimiter({
        tokensPerInterval: 5,
        interval: 'minute',
        method: 'create',
      }),
    ],
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
