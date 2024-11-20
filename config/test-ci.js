module.exports = {
  apiKey: "290f5f88-d510-4e74-934a-7db39bd49536",
  postgres: {
    client: "pg",
    connection: {
      host: "postgres",
      user: "test",
      password: "test",
      database: "test_farm_manager",
    },
    debug: true,
    migrations: {
      tableName: "knex_migrations",
      directory: "../database/migrations",
    },
    seeds: {
      directory: "../database/seeds",
    },
  },
};
