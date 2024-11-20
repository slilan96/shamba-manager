const assert = require('assert');
const { faker } = require('@faker-js/faker');
const app = require('../../../src/app');

describe('authentication', () => {
  after(async () => {
    // cleanup
    const knex = app.get('knex');
    await knex('users').truncate();
  });

  it('registered the authentication service', () => {
    assert.ok(app.service('authentication'));
  });

  describe('local strategy', () => {
    const userInfo = {
      email: faker.internet.email(),
      first_name: faker.name.firstName(),
      last_name: faker.name.lastName(),
      password: faker.internet.password(),
      role: 'administrator',
    };

    before(async () => {
      await app.service('users').create(userInfo);
    });

    it('authenticates user and creates accessToken', async () => {
      const { user, accessToken } = await app.service('authentication').create({
        strategy: 'local',
        ...userInfo,
      });

      assert.ok(accessToken, 'Created access token for user');
      assert.ok(user, 'Includes user in authentication data');
    });
  });
});
