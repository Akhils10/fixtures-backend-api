module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'fixtures',
      charset  : 'utf8'
    }
  },
  test: {
    client: 'mysql',
    connection: {
      host     : 'localhost',
      user     : 'root',
      password : '',
      database : 'test-fixtures',
      charset  : 'utf8'
    }
  }

}
