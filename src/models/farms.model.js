// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class farms extends Model {

  static get tableName() {
    return 'farms';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['farm_name', 'size'],

      properties: {
        farm_name: { type: 'string' },
        title_number: { type: 'string' },
        size: { type: 'number' },
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
  return farms;
};
