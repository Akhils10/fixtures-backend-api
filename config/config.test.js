const knex = require('knex');
const config = require('../knexfile')
const environment = 'test';

const environmentConfig = config[environment];
const connection = knex(environmentConfig);

module.exports = connection;