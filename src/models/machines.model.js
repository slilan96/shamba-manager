// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class machines extends Model {
  static get tableName() {
    return 'machines';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['machine_name', 'machine_type'],

      properties: {
        machine_name: { type: 'string' },
        registration_number: { type: 'string' },
        machine_type: { type: 'string' },
        manufacturer: { type: 'string' },
      },
    };
  }

  $beforeInsert() {
    this.created_at = this.updated_at = new Date();
  }

  $beforeUpdate() {
    this.updated_at = new Date();
  }
}

// eslint-disable-next-line no-unused-vars
module.exports = function createMachineModel(app) {
  return machines;
};
