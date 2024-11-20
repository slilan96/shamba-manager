const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { faker } = require('@faker-js/faker');
const { MethodNotAllowed, NotAuthenticated } = require('@feathersjs/errors');
const _ = require('lodash');
const app = require('../../../../src/app');

chai.use(chaiAsPromised);
const { assert, expect } = chai;

describe("'products' service", () => {
  afterEach(async () => {
    const knex = app.get('knex');
    await knex('products').truncate();
  });

  it('registered the service', () => {
    const service = app.service('products');

    assert.ok(service, 'Registered the service');
  });

  describe('POST creating a product', () => {
    let validProductInput;
    beforeEach(async () => {
      // given
      validProductInput = {
        name: faker.word.noun(),
        units: faker.helpers.arrayElement(['kg', 'liters']),
      };
    });

    it('should create a product when given valid input', async () => {
      // when
      const response = await app.service('products').create(validProductInput);

      // then
      expect(response).to.include(validProductInput);
    });

    it('should reject product creation if any of the required fields are missing', async () => {
      // when
      const fieldToOmit = faker.helpers.arrayElement(['name', 'units']);
      const response = app
        .service('products')
        .create(_.omit(validProductInput, fieldToOmit));

      // then
      await expect(response).to.be.rejected;
    });

    it('should reject product creation from an unauthenticated product request', async () => {
      // when
      const response = app
        .service('products')
        .create(validProductInput, { provider: 'external' });

      // then
      await expect(response).to.be.rejectedWith(NotAuthenticated);
    });

    it('should create a product when given valid input and authenticated', async () => {
      // when
      const response = await app
        .service('products')
        .create(validProductInput, {
          provider: 'external',
          authenticated: true,
        });

      // then
      expect(response).to.include(validProductInput);
    });
  });

  describe('PUT updating/replacing a user', () => {
    it('should reject internal PUT requests', async () => {
      // when
      const response = app.service('products').update('fake-id', {});

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });

    it('should reject external PUT requests', async () => {
      // when
      const response = app
        .service('products')
        .update('fake_id', {}, { provider: 'external' });

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });
  });
});
