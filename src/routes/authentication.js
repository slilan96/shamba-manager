const S = require('fluent-json-schema');
const bcrypt = require('@node-rs/bcrypt');
const fp = require('fastify-plugin');

const loginSchema = S.object()
  .prop('email', S.string().format(S.FORMATS.EMAIL).required())
  .prop('password', S.string().required());

const opts = {
  schema: loginSchema,
};

async function authentication(fastify) {
  fastify.post('/login', opts, async (req, reply) => {
    // const email = req.body.email.toLowerCase();
    const candidatePw = req.body.password;

    // TODO: check if user exists
    const user = {};

    if (!user) {
      fastify.log.error('Attempted login with non existent user');
      throw fastify.httpErrors.notFound('User with specified email not found');
    }

    const isValid = await bcrypt.compare(candidatePw, user.password);

    if (!isValid) {
      throw fastify.httpErrors.badRequest('Invalid email password combination');
    }

    const token = await reply.jwtSign({
      email: user.email,
      id: user.id,
    });

    reply.send({ token });
  });
}

module.exports = fp(authentication);
