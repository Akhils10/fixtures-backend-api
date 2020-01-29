// Update with your config settings.

module.exports = {
  development: {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fixtures'
    }
  },
  production: {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'fixtures'
    }
  },
  test: {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test-fixtures'
    }
  }

};
