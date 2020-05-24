const assert = require('assert');
const app = require('../../src/app');

describe('\'farms\' service', () => {
  it('registered the service', () => {
    const service = app.service('farms');

    assert.ok(service, 'Registered the service');
  });
});
