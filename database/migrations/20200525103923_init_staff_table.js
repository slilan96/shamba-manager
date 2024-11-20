// create staff table
exports.up = function createStaffTable(knex) {
  return knex.schema.createTable("staff", (table) => {
    table.increments("id").primary();
    table.string("email");
    table.string("phone_number");
    table.string("first_name");
    table.string("last_name");
    table.string("role");
    table.boolean("active").defaultTo(true);
    table.timestamps(false, true);
  });
};

exports.down = function dropStaffTable(knex) {
  return knex.schema.dropTable("staff");
};
