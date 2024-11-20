/**
 * SINCE THIS IS GENERATING TEST DATA, THERE IS
 * A NEED TO MAKE SURE THAT THIS DATA WILL NEVER THROW ERRORS
 */
const { faker } = require('@faker-js/faker');
const app = require('../../src/app');

function aUserExists() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return app.service('users').create({
    email: faker.internet.email(firstName, lastName),
    password: faker.internet.password(),
    first_name: firstName,
    last_name: lastName,
    role: faker.helpers.arrayElement(['administrator', 'supervisor']),
  });
}

function aProductExists() {
  return app.service('products').create({
    name: faker.word.noun(),
    units: faker.helpers.arrayElement(['kg', 'l']),
  });
}

function aFarmExists() {
  return app.service('farms').create({
    farm_name: faker.word.noun(),
    title_number: faker.finance.accountNumber(),
    size: faker.number.int(),
  });
}

function aStaffMemberExists() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  return app.service('staff').create({
    email: faker.internet.email(firstName, lastName),
    phone_number: faker.phone.number(),
    first_name: firstName,
    last_name: lastName,
    role: faker.helpers.arrayElement(['foreman', 'supervisor', 'farm-worker']),
  });
}

module.exports = {
  aUserExists,
  aProductExists,
  aFarmExists,
  aStaffMemberExists,
};
