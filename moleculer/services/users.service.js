const dbService = require('moleculer-db')
const mongooseAdapter = require('moleculer-db-adapter-mongoose')
const User = require('../models/user')

module.exports = {
  name: 'users',
  mixins: [dbService],
  adapter: new mongooseAdapter(process.env.DATABASE_URI || "mongodb://localhost:27017"),
  model: User
}
