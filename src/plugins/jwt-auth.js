const fp = require('fastify-plugin');

function jwtAuth(fastify) {
  fastify.register(require('@fastify/jwt'), { secret: 'hello' });

  fastify.decorate('authenticate', async (req, reply) => {
    try {
      await req.jwtVerify();
    } catch (err) {
      fastify.log.error('Invalid Login attempt');
      reply.send(err);
    }
  });
}

module.exports = fp(jwtAuth);
