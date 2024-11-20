const users = require('./users/users.service');
const farms = require('./farms/farms.service');
const products = require('./products/products.service');
const machines = require('./machines/machines.service');
const harvests = require('./harvests/harvests.service');
const staff = require('./staff/staff.service');
// eslint-disable-next-line no-unused-vars
module.exports = function configureServices(app) {
  app.configure(users);
  app.configure(farms);
  app.configure(products);
  app.configure(machines);
  app.configure(harvests);
  app.configure(staff);
};
