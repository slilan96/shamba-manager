const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const faker = require('faker');
const { MethodNotAllowed, NotAuthenticated } = require('@feathersjs/errors');
const _ = require('lodash');
const app = require('../../../../src/app');

chai.use(chaiAsPromised);
const { assert, expect } = chai;
describe('\'projects\' service', () => {
  it('registered the service', () => {
    const service = app.service('projects');

    assert.ok(service, 'Registered the service');
  });
  describe('POST creating a project', () => {
    let validProjectInput;
    beforeEach(async () => {
      // given
      validProjectInput = { project_name: faker.random.word() };
    });

    it('should create a project when given valid input', async () => {
      // when
      const response = await app.service('projects').create(validProjectInput);

      // then
      expect(response).to.include(validProjectInput);
    });

    it('should reject project creation if any of the required fields are missing', async () => {
      // when
      const response = app.service('projects').create(_.omit(validProjectInput, 'project_name'));

      // then
      await expect(response).to.be.rejected;
    });

    it('should reject project creation from an unauthenticated project request', async () => {
      // when
      const response = app.service('projects').create(validProjectInput, { provider: 'external' });

      // then
      await expect(response).to.be.rejectedWith(NotAuthenticated);
    });

    it('should create a project when given valid input and authenticated', async () => {
      // when
      const response = await app.service('projects').create(validProjectInput, { provider: 'external', authenticated: true });

      // then
      expect(response).to.include(validProjectInput);
    });
  });

  describe('PUT updating/replacing a user', () => {
    it('should reject internal PUT requests', async () => {
      // when
      const response = app.service('projects').update('fake-id', {});

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });

    it('should reject external PUT requests', async () => {
      // when
      const response = app.service('projects').update('fake_id', {}, { provider: 'external' });

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });
  });
});
