const { AuthenticationService, JWTStrategy, AuthenticationBaseStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth } = require('@feathersjs/authentication-oauth');
const { NotAuthenticated } = require('@feathersjs/errors');

class ApiKeyStrategy extends AuthenticationBaseStrategy {
  constructor(headerField = 'x-api-key') {
    super();
    this.headerField = headerField;
  }

  // eslint-disable-next-line no-unused-vars
  authenticate(authRequest, params) {
    const { apiKey } = authRequest;

    if (apiKey !== this.app.get('API_KEY')) {
      throw new NotAuthenticated('Invalid API key');
    }

    // To add a user look it up from the service
    // const [ user ] = await this.app.service('users').get({ ...params, query: userQuery })

    return {
      apiKey: true,
      // user
    };
  }

  parse(req) {
    const apiKey = req.headers[this.headerField];

    if (apiKey) {
      return {
        strategy: this.name,
        apiKey,
      };
    }

    return null;
  }
}

module.exports = (app) => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('apiKey', new ApiKeyStrategy());

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};
