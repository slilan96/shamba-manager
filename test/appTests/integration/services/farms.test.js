const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const faker = require('faker');
const { MethodNotAllowed, NotAuthenticated } = require('@feathersjs/errors');
const _ = require('lodash');
const app = require('../../../../src/app');

chai.use(chaiAsPromised);
const { assert, expect } = chai;

describe('\'farms\' service', () => {
  afterEach(async () => {
    const knex = app.get('knex');
    await knex('farms').truncate();
  });

  it('registered the service', () => {
    const service = app.service('farms');

    assert.ok(service, 'Registered the service');
  });

  describe('POST creating a farm', () => {
    let validFarmInput;
    beforeEach(async () => {
      // given
      validFarmInput = {
        farm_name: faker.random.word(),
        title_number: faker.finance.account(),
        size: faker.random.number(),
      };
    });

    it('should create a farm when given valid input', async () => {
      // when
      const response = await app.service('farms').create(validFarmInput);

      // then
      expect(response).to.include(validFarmInput);
    });

    it('should reject farm creation if any of the required fields are missing', async () => {
      // when
      const fieldToOmit = faker.random.arrayElement(['farm_name', 'size']);
      const response = app.service('farms').create(_.omit(validFarmInput, fieldToOmit));

      // then
      await expect(response).to.be.rejected;
    });

    it('should reject farm creation from an unauthenticated farm request', async () => {
      // when
      const response = app.service('farms').create(validFarmInput, { provider: 'external' });

      // then
      await expect(response).to.be.rejectedWith(NotAuthenticated);
    });

    it('should create a farm when given valid input and authenticated', async () => {
      // when
      const response = await app.service('farms').create(validFarmInput, { provider: 'external', authenticated: true });

      // then
      expect(response).to.include(validFarmInput);
    });
  });

  describe('PUT updating/replacing a farm', () => {
    it('should reject internal PUT requests', async () => {
      // when
      const response = app.service('farms').update('fake-id', { last_name: faker.name.lastName() });

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });

    it('should reject external PUT requests', async () => {
      // when
      const response = app.service('farms').update(
        'fake_id',
        { farm_name: faker.name.lastName() },
        { provider: 'external' },
      );

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });
  });
});
