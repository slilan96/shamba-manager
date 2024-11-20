exports.up = function addProjectIdToHarvestTable(knex) {
  return knex.schema.table("harvests", (table) => {
    table.string("project_id");
  });
};

exports.down = function dropProjectIdFromHarvestTable(knex) {
  return knex.schema.table("harvests", (table) => {
    table.dropColumn("project_id");
  });
};
