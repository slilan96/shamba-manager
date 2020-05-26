// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class products extends Model {

  static get tableName() {
    return 'products';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'units'],

      properties: {
        id: 'integer',
        name: 'string',
        units: 'string',
        created_at: 'string',
        updated_at: 'string',
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
  return products;
};
