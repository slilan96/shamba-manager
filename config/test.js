module.exports = {
  postgres: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'farm_manager',
      password: 'farm_manager',
      database: 'test_shamba_manager'
    },
    debug: true,
    migrations: {
      'tableName': 'knex_migrations',
      'directory': '../database/migrations'
    },
    seeds: {
      'directory': '../database/seeds'
    }
  }
};
