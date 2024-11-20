const { faker } = require('@faker-js/faker');
const app = require('../app');
const logger = require('../logger');

const knex = app.get('knex');

// FIXME: remove authenicated parameter from service calls

async function createUsers() {
  await knex('users').truncate();
  const users = [];

  for (let i = 0; i < 5; i += 1) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    users.push({
      email: faker.internet.email(firstName, lastName),
      password: faker.internet.password(),
      first_name: firstName,
      last_name: lastName,
      role: faker.helpers.arrayElement([
        'administrator',
        'supervisor',
        'farm-worker',
      ]),
    });
  }

  logger.info('Users will be created with the following info: \n');
  console.log(users); // eslint-disable-line no-console

  await app.service('users').create(users, { authenticated: true });
}

async function createStaff() {
  await knex('staff').truncate();
  const staff = [];

  for (let i = 0; i < 20; i += 1) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();

    staff.push({
      email: faker.internet.email(firstName, lastName),
      phone_number: faker.phone.number(),
      first_name: firstName,
      last_name: lastName,
      role: faker.helpers.arrayElement(['foreman', 'supervisor', 'farm-worker']),
    });
  }

  await app.service('staff').create(staff, { authenticated: true });
}

async function createFarms() {
  await knex('farms').truncate();
  const farms = [];

  for (let i = 0; i < 10; i += 1) {
    farms.push({
      farm_name: faker.word.noun(),
      title_number: faker.finance.accountNumber(),
      size: faker.number.int(),
    });
  }

  await app.service('farms').create(farms, { authenticated: true });
}

async function createProducts() {
  await knex('products').truncate();
  const products = [];

  for (let i = 0; i < 10; i += 1) {
    products.push({
      name: faker.word.noun(), // maybe make this more realistic by extending the function?
      units: 'kg', // TODO once you have more functionality for stuff like Dairy then please extend this
    });
  }

  await app.service('products').create(products, { authenticated: true });
}

const getIdsFromDbResult = (results) => results.map(({ id }) => id);

// this function assumes that
// 1. Users exist
// 2. Staff exist
// 3. Farms exist
// 4. Products exits
async function createHarvests() {
  await knex('harvests').truncate();

  const farmWorkers = await app.service('staff').find({
    query: {
      role: 'farm-worker',
      $select: ['id'],
    },
  });
  const farmWorkerIds = getIdsFromDbResult(farmWorkers);

  const recordingOfficers = await app.service('staff').find({
    query: {
      role: { $in: ['foreman', 'supervisor'] },
      $select: ['id'],
    },
  });
  const recordingOfficersIds = getIdsFromDbResult(recordingOfficers);

  const products = await app
    .service('products')
    .find({ query: { $select: ['id'] } });
  const productIds = getIdsFromDbResult(products.data);

  const farms = await app.service('farms').find({ query: { $select: ['id'] } });
  const farmIds = getIdsFromDbResult(farms.data);

  const harvests = [];

  for (let i = 0; i < 30; i += 1) {
    harvests.push({
      amount: faker.number.int({ min: 10, max: 100 }), // set bounds to get more realistic data
      harvesting_worker: faker.helpers.arrayElement(farmWorkerIds),
      clerk: faker.helpers.arrayElement(recordingOfficersIds),
      harvest_farm: faker.helpers.arrayElement(farmIds),
      date_of_harvest: faker.date.recent(),
      harvested_product: faker.helpers.arrayElement(productIds),
    });
  }

  await app.service('harvests').create(harvests, { authenticated: true });
}

/**
 * This is where the real magic happens
 * Make sure that you have some users, staff and products BEFORE creating
 * a harvest.
 */
async function createSeedData() {
  try {
    await createUsers();
    await createProducts();
    await createStaff();
    await createFarms();
    await createHarvests();
    process.exit();
  } catch (error) {
    logger.error('Error occured', error);
  }
}

process.on('unhandledRejection', (reason, p) => {
  logger.error('Unhandled Rejection at: Promise ', p, reason);
  process.exit(1);
});

createSeedData();
