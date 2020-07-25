module.exports = {
  allowedOrigins: process.env.ALLOWED_ORIGINS,
  apiKey: process.env.API_KEY,
  apiLimter: {
    // some sensible defaults, review using logs
    http: {
      windowMs: 60 * 1000, // 1 minutes window
      delayAfter: 30, // begin slowing down responses after the 30th request
      delayMs: 1000, // slow down subsequent responses by 1 seconds per request
      max: 60, // start blocking after 60 requests
    },
  },
  authentication: {
    entity: 'user',
    service: 'users',
    secret: process.env.JWT_SECRET,
    authStrategies: [
      'jwt',
      'local',
    ],
    jwtOptions: {
      header: {
        typ: 'access',
      },
      audience: process.env.JWT_AUDIENCE,
      issuer: 'feathers',
      algorithm: 'HS256',
      expiresIn: '1d',
    },
    limiter: {
      // have stricter defaults here
      http: {
        windowMs: 60 * 1000, // 1 minutes window
        delayAfter: 5, // begin slowing down responses after the 5th request
        delayMs: 3000, // slow down subsequent responses by 3 seconds per request
        max: 10, // start blocking after 10 requests
      },
    },
    local: {
      usernameField: 'email',
      passwordField: 'password',
    },
  },
  host: process.env.FEATHERS_HOST,
  port: process.env.PORT,
  public: '../public',
  postgres: {
    client: 'pg',
    connection: process.env.DATABASE_URL,
    migrations: {
      tableName: 'knex_migrations',
      directory: '../database/migrations',
    },
  },
};
