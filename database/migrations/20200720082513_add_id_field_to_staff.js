exports.up = function addIDFieldToStaffTable(knex) {
  return knex.schema.table("staff", (table) => {
    // has this field been made unique?
    table.string("national_id");
  });
};

exports.down = function removeIDField(knex) {
  return knex.schema.table("staff", (table) => {
    table.dropColumn("national_id");
  });
};
