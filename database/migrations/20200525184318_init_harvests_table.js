
exports.up = function createHarvestTable(knex) {
  return knex.schema.createTable('harvests', (table) => {
    table.increments('id').primary();
    table.float('amount');
    table.string('harvesting_worker');
    table.string('clerk');
    table.string('harvest_farm');
    table.string('harvested_product');
    table.timestamps(false, true);
  });
};

exports.down = function dropHarvestTable(knex) {
  return knex.schema.dropTable('harvests');
};
