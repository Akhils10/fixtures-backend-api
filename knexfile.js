// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST || "postgres",
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'fixtures'
      }
  },
  production: {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'fixtures'
      }
  },
  test: {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT || 5432,
        user: process.env.DB_USER || 'user',
        password: process.env.DB_PASSWORD,
        database: 'fixtures-test'
      }
  }

};
