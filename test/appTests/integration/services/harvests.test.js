const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const faker = require('faker');
const _ = require('lodash');
const { MethodNotAllowed, NotAuthenticated, NotFound } = require('@feathersjs/errors');
const app = require('../../../../src/app');

chai.use(chaiAsPromised);
const { assert, expect } = chai;

function createStaffWithRole(role) {
  const firstName = faker.name.firstName();
  const lastName = faker.name.lastName();

  const staff = {
    email: faker.internet.email(firstName, lastName),
    phone_number: faker.phone.phoneNumber(),
    first_name: firstName,
    last_name: lastName,
    role,
  };

  return app.service('staff').create(staff);
}

function createFarm() {
  const farm = {
    farm_name: faker.random.word(),
    title_number: faker.finance.account(),
    size: faker.random.number(),
  };

  return app.service('farms').create(farm);
}

function createProduct() {
  const product = {
    name: faker.random.word(),
    units: 'kg',
  };

  return app.service('products').create(product);
}

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
      const product = await createProduct();
      const farm = await createFarm();
      const recordingOfficer = await createStaffWithRole('foreman');
      const farmWorker = await createStaffWithRole('farm-worker');

      const harvest = {
        amount: faker.random.number({ min: 10, max: 100 }), // set bounds to get more realistic data
        harvesting_worker: farmWorker.id.toString(),
        clerk: recordingOfficer.id.toString(),
        harvest_farm: farm.id.toString(),
        date_of_harvest: faker.date.recent(),
        harvested_product: product.id.toString(),
      };

      // when
      const res = await app.service('harvests').create(harvest);

      // then
      expect(res).to.include(_.omit(harvest, 'date_of_harvest'));
      expect(res.date_of_harvest).to.deep.equal(harvest.date_of_harvest);
    });

    it('should create a harvest given valid input from authenticated external request', async () => {
      // given
      const product = await createProduct();
      const farm = await createFarm();
      const recordingOfficer = await createStaffWithRole('foreman');
      const farmWorker = await createStaffWithRole('farm-worker');

      const harvest = {
        amount: faker.random.number({ min: 10, max: 100 }), // set bounds to get more realistic data
        harvesting_worker: farmWorker.id.toString(),
        clerk: recordingOfficer.id.toString(),
        harvest_farm: farm.id.toString(),
        date_of_harvest: faker.date.recent(),
        harvested_product: product.id.toString(),
      };

      // when
      const res = await app.service('harvests').create(harvest, { provider: 'external', authenticated: true });

      // then
      expect(res).to.include(_.omit(harvest, 'date_of_harvest'));
      expect(res.date_of_harvest).to.deep.equal(harvest.date_of_harvest);
    });

    it('should reject a create request if the farm does not exist', async () => {
      // given
      const product = await createProduct();
      const recordingOfficer = await createStaffWithRole('foreman');
      const farmWorker = await createStaffWithRole('farm-worker');

      const harvest = {
        amount: faker.random.number({ min: 10, max: 100 }), // set bounds to get more realistic data
        harvesting_worker: farmWorker.id.toString(),
        clerk: recordingOfficer.id.toString(),
        harvest_farm: faker.random.number(),
        date_of_harvest: faker.date.recent(),
        harvested_product: product.id.toString(),
      };

      // when
      const res = app.service('harvests').create(harvest);

      // then
      await expect(res).to.be.rejectedWith(NotFound);
    });

    it('should reject a create request if the product does not exist', async () => {
      // given
      const farm = await createFarm();
      const recordingOfficer = await createStaffWithRole('foreman');
      const farmWorker = await createStaffWithRole('farm-worker');

      const harvest = {
        amount: faker.random.number({ min: 10, max: 100 }), // set bounds to get more realistic data
        harvesting_worker: farmWorker.id.toString(),
        clerk: recordingOfficer.id.toString(),
        harvest_farm: farm.id.toString(),
        date_of_harvest: faker.date.recent(),
        harvested_product: faker.random.number(),
      };

      // when
      const res = app.service('harvests').create(harvest);

      // then
      await expect(res).to.be.rejectedWith(NotFound);
    });

    it('should reject a create request if the clerk/recording officer does not exist', async () => {
      // given
      const product = await createProduct();
      const farm = await createFarm();
      const farmWorker = await createStaffWithRole('farm-worker');

      const harvest = {
        amount: faker.random.number({ min: 10, max: 100 }), // set bounds to get more realistic data
        harvesting_worker: farmWorker.id.toString(),
        clerk: faker.random.number(),
        harvest_farm: farm.id.toString(),
        date_of_harvest: faker.date.recent(),
        harvested_product: product.id.toString(),
      };

      // when
      const res = app.service('harvests').create(harvest);

      // then
      await expect(res).to.be.rejectedWith(NotFound);
    });

    it('should reject a create request if the harvesting-worker does not exist', async () => {
      // given
      const product = await createProduct();
      const farm = await createFarm();
      const recordingOfficer = await createStaffWithRole('foreman');

      const harvest = {
        amount: faker.random.number({ min: 10, max: 100 }), // set bounds to get more realistic data
        harvesting_worker: faker.random.number(),
        clerk: recordingOfficer.id.toString(),
        harvest_farm: farm.id.toString(),
        date_of_harvest: faker.date.recent(),
        harvested_product: product.id.toString(),
      };

      // when
      const res = app.service('harvests').create(harvest);

      // then
      await expect(res).to.be.rejectedWith(NotFound);
    });

    it('should reject harvest data if external request is not authenticated', async () => {
      // given
      const product = await createProduct();
      const farm = await createFarm();
      const recordingOfficer = await createStaffWithRole('foreman');
      const farmWorker = await createStaffWithRole('farm-worker');

      const harvest = {
        amount: faker.random.number({ min: 10, max: 100 }), // set bounds to get more realistic data
        harvesting_worker: farmWorker.id.toString(),
        clerk: recordingOfficer.id.toString(),
        harvest_farm: farm.id.toString(),
        date_of_harvest: faker.date.recent(),
        harvested_product: product.id.toString(),
      };

      // when
      const res = app.service('harvests').create(harvest, { provider: 'external' });

      // then
      await expect(res).to.be.rejectedWith(NotAuthenticated);
    });

    it('should reject harvest data if one of the required fields is missing', async () => {
      // given
      const product = await createProduct();
      const farm = await createFarm();
      const recordingOfficer = await createStaffWithRole('foreman');
      const farmWorker = await createStaffWithRole('farm-worker');

      const harvest = {
        amount: faker.random.number({ min: 10, max: 100 }), // set bounds to get more realistic data
        harvesting_worker: farmWorker.id.toString(),
        clerk: recordingOfficer.id.toString(),
        harvest_farm: farm.id.toString(),
        date_of_harvest: faker.date.recent(),
        harvested_product: product.id.toString(),
      };

      const fields = ['amount', 'harvesting_worker', 'clerk', 'harvest_farm', 'date_of_harvest', 'harvested_product'];

      const omittedField = faker.random.arrayElement(fields);

      // when
      const res = app.service('harvests').create(_.omit(harvest, omittedField));

      // then
      await expect(res).to.be.rejected;
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
