// eslint-disable-next-line no-unused-vars
module.exports = function checkHarvestInputParams(options = {}) {
  return async (context) => {
    const { app } = context;
    const { data } = context;

    /**
     * This code leverages the fact that Feathers Services
     * will throw a NotFound error if entity does not exist
     */
    await app.service('farms').get(data.harvest_farm);
    await app.service('products').get(data.harvested_product);
    await app.service('staff').get(data.clerk);
    await app.service('staff').get(data.harvesting_worker);

    return context;
  };
};
