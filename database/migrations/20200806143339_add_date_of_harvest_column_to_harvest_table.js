exports.up = function addDateOfHarvestColumn(knex) {
  return knex.schema.table('harvests', (table) => {
    table.timestamp('date_of_harvest');
  });
};

exports.down = function dropDateOfHarvestColumn(knex) {
  return knex.schema.table('harvests', (table) => {
    table.dropColumn('date_of_harvest');
  });
};
