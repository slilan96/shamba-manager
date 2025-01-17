// create users table
exports.up = function createUsersTable(knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary();
    table.string("email");
    table.string("password");
    table.string("first_name");
    table.string("last_name");
    table.string("role");
    table.boolean("active").defaultTo(true);
    table.timestamps(false, true);
  });
};

exports.down = function dropUsersTable(knex) {
  return knex.schema.dropTable("users");
};
