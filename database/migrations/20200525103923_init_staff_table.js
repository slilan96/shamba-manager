// create staff table
exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary();
    table.string('email');
    table.string('phone_number');
    table.string('first_name');
    table.string('last_name');
    table.string('role');
    table.boolean('active').defaultTo(true);
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users');
};
