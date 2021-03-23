exports.up = (knex) => knex.schema.table('harvests', (table) => {
  table.dropColumn('project_id');
});

exports.down = (knex) => knex.schema.table('harvests', (table) => {
  table.string('project_id');
});
