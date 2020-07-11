module.exports = {
  postgres: {
    client: 'pg',
    connection: {
      host: 'postgres',
      user: 'test',
      password: 'test',
      database: 'test_farm_manager'
    },
    debug: true,
    migrations: {
      tableName: 'knex_migrations',
      directory: '../database/migrations'
    },
    seeds: {
      directory: '../database/seeds'
    }
  }
};
