const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const { MethodNotAllowed } = require('@feathersjs/errors');
const app = require('../../../../src/app');

chai.use(chaiAsPromised);
const { assert, expect } = chai;

describe('\'harvests\' service', () => {
  afterEach(async () => {
    const knex = app.get('knex');
    await knex('harvests').truncate();
    await knex('users').truncate();
    await knex('products').truncate();
    await knex('farms').truncate();
    await knex('staff').truncate();
  });

  it('registered the service', () => {
    const service = app.service('harvests');

    assert.ok(service, 'Registered the service');
  });

  describe('POST creating a new harvest', () => {
    it('should create a harvest given valid input', async () => {
      // given
    });

    it('should create a harvest given valid input from authenticated external request', async () => {
    });

    it('should reject a create request if the farm does not exist', async () => {
    });

    it('should reject a create request if the product does not exist', async () => {
    });

    it('should reject a create request if the clerk/recording officer does not exist', async () => {
    });

    it('should reject a create request if the harvesting-worker does not exist', async () => {
    });

    it('should reject harvest data if external request is not authenticated', async () => {
    });
  });

  describe('PUT updating/replacing a harvests', () => {
    it('should reject internal PUT requests', async () => {
      // when
      const response = app.service('harvests').update('fake-id', {});

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });

    it('should reject external PUT requests', async () => {
      // when
      const response = app.service('harvests').update('fake_id', {}, { provider: 'external' });

      // then
      await expect(response).to.be.rejectedWith(MethodNotAllowed);
    });
  });
});
