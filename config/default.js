module.exports = {
  apiKey: '811e70a4-47f4-4707-a5a3-88002bed25d5',
  host: 'localhost',
  port: 3030,
  public: '../public/',
  paginate: {
    default: 10,
    max: 50,
  },
  authentication: {
    entity: 'user',
    service: 'users',
    secret: 'nGwaenW5WTVN4IHp5EgKneyNdUc=',
    authStrategies: [
      'jwt',
      'local',
    ],
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: 'https://yourdomain.com',
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    local: {
      usernameField: 'email',
      passwordField: 'password',
    },
  },
  postgres: {
    client: 'pg',
    connection: {
      host: '127.0.0.1',
      user: 'farm_manager',
      password: 'farm_manager',
      database: 'shamba_manager',
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
