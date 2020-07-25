const { AuthenticationService } = require('@feathersjs/authentication');

class AuthServiceWithPayload extends AuthenticationService {
  async getPayload(authResult, params) {
    const payload = await super.getPayload(authResult, params);
    const { user } = authResult;

    if (user && user.role) {
      payload.permissions = user.role;
    }

    return payload;
  }
}

AuthServiceWithPayload.prototype.docs = {
  description: 'An authentication service for the API\'s consumers',
};

exports.AuthServiceWithPayload = AuthServiceWithPayload;
