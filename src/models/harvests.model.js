// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class harvests extends Model {

  static get tableName() {
    return 'harvests';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['amount', 'harvesting_worker', 'clerk', 'harvest_farm', 'harvested_product'],

      properties: {
        amount: 'number',
        harvesting_worker: 'string',
        clerk: 'string',
        harvest_farm: 'string',
        harvested_product: 'string',
      }
    };
  }

  $beforeInsert() {
    this.created_at = this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

// eslint-disable-next-line
module.exports = function (app) {
  return harvests;
};
