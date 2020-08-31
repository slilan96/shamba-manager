// See https://vincit.github.io/objection.js/#models
// for more of what you can do here.
const { Model } = require('objection');

class Projects extends Model {
  static get tableName() {
    return 'projects';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['project_name'],

      properties: {
        id: { type: 'string' },
        project_name: { type: 'string' },
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
module.exports = function createProjectsModel(app) {
  return Projects;
};
