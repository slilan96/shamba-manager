module.exports = {
  postgres: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      'tableName': 'knex_migrations',
      'directory': '../database/migrations'
    }
  }
};
