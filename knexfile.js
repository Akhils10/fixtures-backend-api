// Update with your config settings.

module.exports = {
  development: {
    client: 'pg',
    connection: process.env.POSTGRES_URI
  },
  production: {
    client: 'pg',
    connection: 'postgres://atfuodvtofjtrc:4c5398746dce8e74ba1121366297144876ab91b17a7d94cd48f9948c5cf55bfb@ec2-107-22-216-151.compute-1.amazonaws.com:5432/da7576q3rktgep',
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
