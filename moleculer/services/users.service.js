const dbService = require('moleculer-db')
const MongooseAdapter = require('moleculer-db-adapter-mongoose')
const user = require('../models/user')

module.exports = {
  name: 'users',
  settings: {
    JWT_SECRET: process.env.JWT_SECRET || '4CE03081E34BD907A6210E1452C3F07C'
  },
  mixins: [dbService],
  // TODO: move mongooseAdapter parameters to settings
  adapter: new MongooseAdapter(process.env.DATABASE_URI || 'mongodb://localhost:27017'),
  model: user,
  actions: {}
}
