const assert = require('assert');
const app = require('../../../src/app');

describe('\'harvests\' service', () => {
  it('registered the service', () => {
    const service = app.service('harvests');

    assert.ok(service, 'Registered the service');
  });
});
