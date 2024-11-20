// Initializes the `farms` service on path `/farms`
const { Farms } = require('./farms.class');
const createModel = require('../../models/farms.model');
const hooks = require('./farms.hooks');

module.exports = function initializeFarmsService(app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
    multi: true,
  };

  // Initialize our service with any options it requires
  app.use('/farms', new Farms(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('farms');

  service.hooks(hooks);
};
