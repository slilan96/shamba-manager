module.exports = {
  apiKey: '290f5f88-d510-4e74-934a-7db39bd49536',
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
