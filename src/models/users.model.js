// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class users extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'password', 'first_name', 'last_name', 'role'],
      properties: {
        id: 'integer',
        email: 'string',
        password: 'string',
        first_name: 'string',
        last_name: 'string',
        role: {
          type: 'string',
          enum: ['administrator', 'supervisor', 'farm-worker'],
        },
        created_at: 'string',
        updated_at: 'string',
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

// eslint-disable-next-line
module.exports = function (app) {
  return users;
};
