exports.up = function createMachinesTables(knex) {
  // checking if machines table exists
  // this is result of not checking if a knex call
  // is made elsewhere so be careful
  return Promise.resolve(knex.schema.dropTableIfExists('machines'))
    .then(() => knex.schema.createTable('machines', (table) => {
      table.increments('id').primary();
      table.string('text');
      table.timestamps(false, true);
    }));
};

exports.down = function dropMachinesTable(knex) {
  return knex.schema.dropTable('machines');
};
