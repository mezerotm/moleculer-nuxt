const dbService = require('moleculer-db')
const mongooseAdapter = require('moleculer-db-adapter-mongoose')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

module.exports = {
  name: 'users',
  settings: {
    JWT_SECRET: process.env.JWT_SECRET || '4CE03081E34BD907A6210E1452C3F07C'
  },
  mixins: [dbService],
  adapter: new mongooseAdapter(process.env.DATABASE_URI || "mongodb://localhost:27017"),
  model: User,
  actions: {
    // resolveToken: {
		// 	cache: {
		// 		keys: ["token"],
     //    // 1 hour
		// 		ttl: 60 * 60
		// 	},
		// 	params: {
		// 		token: "string"
		// 	},
		// 	handler(ctx) {
     //    try {
     //      //TODO: could be promise based, try with 'await' once confirmed with callback
     //      jwt.verify(ctx.params.token, this.settings.JWT_SECRET, (error, decoded) => {
     //        if(error) return console.error(error)
     //        if(decoded.id) {
     //          return this.getById(decoded.id)
     //        } else {
     //          return console.error('no decoded.id')
     //        }
     //      })
     //    } catch(error) {
     //      return console.error(error)
     //    }
		// 	}
		// }
  }
}
