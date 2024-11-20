const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const swagger = require('feathers-swagger');

const logger = require('./logger');
const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');
const authentication = require('./services/authentication/authentication.service');
const objection = require('./objection');
const { version } = require('../package.json');

const app = express(feathers());

function forceSsl(req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
}

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());

if (
  process.env.NODE_ENV === 'production'
  && process.env.NODE_CONFIG_ENV === 'production'
) {
  app.use(cors({ origin: app.get('allowedOrigins') }));
  app.use(forceSsl);
} else {
  app.use(cors());
}

app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(objection);
app.configure(
  swagger({
    docsPath: '/docs',
    uiIndex: path.join(__dirname, 'docs.html'),
    specs: {
      info: {
        title: 'Shamba Manager API documentation',
        description:
          'Shamba Manager is an API service designed to help small and large '
          + 'farms alike. This system tries to break up a farm into smaller to reason bits '
          + 'that capture most, if not all, of the key operations in a farm. ',
        version,
      },
    },
  }),
);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger, html: false }));

app.hooks(appHooks);

module.exports = app;
