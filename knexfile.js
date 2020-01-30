// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.POSTGRES_URI
  },
  production: {
    client: 'pg',
    connection: 'postgres://jcgncnffgwagmh:ff9903a8c6640d745713d3a38fd44f96e648fd691083c1e38f963c0b5aef3e39@ec2-54-92-174-171.compute-1.amazonaws.com:5432/dbmctal2mm9ui4',
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
