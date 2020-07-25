// Application hooks that run for every service
const rateLimit = require('./customHooks/rateLimiter');

module.exports = {
  before: {
    all: [rateLimit({ tokensPerInterval: 50, interval: 'minute' })],
    find: [],
    get: [],
    create: [],
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
