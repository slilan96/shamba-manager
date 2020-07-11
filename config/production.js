module.exports = {
  authentication: {
    entity: 'user',
    service: 'users',
    secret: process.env.JWT_SECRET,
    authStrategies: [
      'jwt',
      'local'
    ],
    jwtOptions: {
      header: {
        'typ': 'access'
      },
      audience: process.env.JWT_AUDIENCE,
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d'
    },
    local: {
      usernameField: 'email',
      passwordField: 'password'
    }
  },
  host: process.env.FEATHERS_HOST,
  post: 3030,
  public: '../public',
  postgres: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      'tableName': 'knex_migrations',
      'directory': '../database/migrations'
    }
  }
};
