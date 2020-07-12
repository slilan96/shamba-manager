// Initializes the `harvests` service on path `/harvests`
const { Harvests } = require('./harvests.class');
const createModel = require('../../models/harvests.model');
const hooks = require('./harvests.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate'),
  };

  // Initialize our service with any options it requires
  app.use('/harvests', new Harvests(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('harvests');

  service.hooks(hooks);
};
