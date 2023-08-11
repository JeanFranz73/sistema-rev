const knex = require('knex')
const config = require('./config.js')

module.exports = knex(config.db);
