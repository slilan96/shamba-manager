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
    this.createdAt = this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date();
  }
}

// eslint-disable-next-line
module.exports = function (app) {
  return farms;
};
