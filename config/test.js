module.exports = {
  apiKey: '290f5f88-d510-4e74-934a-7db39bd49536',
  postgres: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'farm_manager',
      port: 5500,
      password: 'farm_manager',
      database: 'test_farm_manager',
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: '../database/migrations',
    },
    seeds: {
      directory: '../database/seeds',
    },
  },
};
