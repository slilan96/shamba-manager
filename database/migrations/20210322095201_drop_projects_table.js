exports.up = (knex) => knex.schema.dropTable("projects");

exports.down = (knex) =>
  knex.schema.createTable("projects", (table) => {
    table.increments("id").primary();
    table.string("project_name");
    table.timestamps(false, true);
  });
