const users = require('./users/users.service.js');
const farms = require('./farms/farms.service.js');
const products = require('./products/products.service.js');
const machines = require('./machines/machines.service.js');
const harvests = require('./harvests/harvests.service.js');
const staff = require('./staff/staff.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(farms);
  app.configure(products);
  app.configure(machines);
  app.configure(harvests);
  app.configure(staff);
};
