exports.up = function createProjectsTable(knex) {
  return knex.schema.createTable('projects', (table) => {
    table.increments('id').primary();
    table.string('project_name');
    table.timestamps(false, true);
  });
};

exports.down = function dropProjectsTable(knex) {
  return knex.schema.dropTable('projects');
};
