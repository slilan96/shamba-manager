const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const faker = require('faker');
const { NotAuthenticated, MethodNotAllowed } = require('@feathersjs/errors');
const _ = require('lodash');
const app = require('../../../../src/app');

chai.use(chaiAsPromised);
const { expect, assert } = chai;

describe('\'staff\' service', () => {
  afterEach(async () => {
    const knex = app.get('knex');
    await knex('staff').truncate();
  });

  it('registered the service', () => {
    const service = app.service('staff');

    assert.ok(service, 'Registered the service');
  });

  describe('POST creating a staff', () => {
    let validStaffInfo;
    beforeEach(() => {
      // given
      validStaffInfo = {
        email: faker.internet.email(),
        phone_number: faker.phone.phoneNumber(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        role: faker.random.arrayElement(['foreman', 'supervisor', 'farm-worker']),
      };
    });

    it('should register a staff when presented with valid input', async () => {
      // given
      const response = await app.service('staff').create(validStaffInfo);

      // then
      expect(response).to.include(validStaffInfo);
    });

    it('should reject staff creation if one of the required fields is missing', async () => {
      // given
      const requiredFields = ['first_name', 'last_name', 'role'];
      const ommittedField = faker.random.arrayElement(requiredFields);

      // when
      const response = app.service('staff').create(_.omit(validStaffInfo, ommittedField), { authenticated: true });

      // then
      await expect(response).to.be.rejected;
    });

    it('should reject staff creation from an unauthenticated external request', async () => {
      // when
      const response = app.service('staff').create(validStaffInfo, { disableRateLimit: true, provider: 'external' });

      // then
      await expect(response).to.be.rejectedWith(NotAuthenticated);
    });

    // TODO reject staff creation if email already exists
  });

  describe('PUT updating/replacing a staff', () => {
    it('should reject internal PUT requests', async () => {
      // when
      const response = app.service('staff').update('fake-id', {});

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });

    it('should reject external PUT requests', async () => {
      // when
      const response = app.service('staff').update('fake_id', {}, { provider: 'external' });

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });
  });
});
