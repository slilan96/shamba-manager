module.exports = {
  apiKey: '811e70a4-47f4-4707-a5a3-88002bed25d5',
  postgres: {
    client: 'pg',
    connection: {
      host: 'postgres',
      user: 'test',
      password: 'test',
      database: 'test_farm_manager',
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
