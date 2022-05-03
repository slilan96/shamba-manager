module.exports = (fastify, opts = {}) => {
  // TODO:
  // 1. add routes and plugins here
  fastify.register(require('@fastify/sensible'));

  return fastify;
};
