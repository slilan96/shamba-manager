'use strict'

const fastify = require('fastify');
const closeWithGrace = require('close-with-grace');

const app = fastify({ logger: true });

const appService = require('./fastify-app.js');

app.register(appService);

const closeListeners = closeWithGrace({ delay: 500 }, async ({ signal, err, manual }) => {
  if (err) {
    app.log.error(err);
  }

  await app.close();
});

app.addHook('onClose', (instance, done) => {
  closeListeners.uninstall();
  done();
});

app.listen(process.env.PORT || 3000, (err) => {
  if (err) {
    app.log.error(err);
    process.exit(1);
  }
});
