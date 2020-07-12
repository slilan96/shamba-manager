module.exports = {
  apiKey: '811e70a4-47f4-4707-a5a3-88002bed25d5',
  postgres: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'farm_manager',
      password: 'farm_manager',
      database: 'test_shamba_manager',
    },
    debug: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: '../database/migrations',
    },
    seeds: {
      directory: '../database/seeds',
    },
  },
};
