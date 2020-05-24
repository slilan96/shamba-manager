// create farms table
exports.up = function(knex) {
  return knex.schema.createTable('farms', (table) => {
    table.increments('id').primary();
    table.string('farm_name');
    table.string('title_number');
    table.float('size');

    //make title numbers unique
    table.unique('title_number');
    table.timestamps(false, true);
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('farms'); 
};
