exports.up = function createProductTable(knex) {
  return knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.string('name');
    table.string('units');
    table.timestamps(false, true);
  });
};

exports.down = function dropProductTable(knex) {
  return knex.schema.dropTable('products');
};
