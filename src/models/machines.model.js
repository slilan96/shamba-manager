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
      required: ['text'],

      properties: {
        text: { type: 'string' },
      },
    };
  }

  $beforeInsert() {
    this.createdAt = this.updatedAt = new Date();
  }

  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }
}

module.exports = function createMachineModel(app) {
  const db = app.get('knex');

  db.schema.hasTable('machines').then((exists) => {
    if (!exists) {
      db.schema.createTable('machines', (table) => {
        table.increments('id');
        table.string('text');
        table.timestamp('createdAt');
        table.timestamp('updatedAt');
      })
        .then(() => console.log('Created machines table')) // eslint-disable-line no-console
        .catch((e) => console.error('Error creating machines table', e)); // eslint-disable-line no-console
    }
  })
    .catch((e) => console.error('Error creating machines table', e)); // eslint-disable-line no-console

  return machines;
};
