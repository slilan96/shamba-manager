exports.up = function dropNationalIdFieldFromTable(knex) {
  return knex.schema.table('staff', (table) => {
    table.dropColumn('national_id');
  });
};

exports.down = function addNationalIdFieldFromTable(knex) {
  return knex.schema.table('staff', (table) => {
    table.string('national_id');
  });
};
