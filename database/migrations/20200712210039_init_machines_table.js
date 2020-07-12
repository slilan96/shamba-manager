exports.up = function createMachinesTable(knex) {
  return knex.schema.createTable('machines', (table) => {
    table.increments('id').primary();
    table.string('machine_name');
    table.string('registration_number');
    table.string('manufacturer');
    table.timestamps(false, true);
  });
};

exports.down = function dropMachinesTable(knex) {
  return knex.schema.dropTable('machines');
};
