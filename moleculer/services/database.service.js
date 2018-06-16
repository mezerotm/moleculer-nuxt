const mongoose = require('mongoose');

module.exports = {
  name: 'database',
  settings: {
    //TODO: allow custom database URI through api? (www.service.js)
    databaseUri: process.env.DATABASE_URI || "mongodb://localhost:27017"
  },
  actions: {
    put: {
      params: {},
      handler(ctx) {
        const name = ctx.params.name
        const ctxSchema = ctx.params.schema

        const schema = new mongoose.Schema(ctxSchema)
        mongoose.model(name, schema)
      }
    },
    post: {
      params: {},
      handler(ctx) {
        const name = ctx.params.name
        const entries = ctx.params.entries

        const model = mongoose.model(name)
        model.insertMany(entries)
      }
    },
    get: {
      params: {},
      async handler(ctx) {
        const name = ctx.params.name

        const model = mongoose.model(name)

        return model.schema
      }
    },
    delete: {
      params: {},
      handler(ctx) {

      }
    }
  },
  //TODO: add moleculer event listener to listen to mongoose streams for logging
  async created() {
    //TODO: do something if database does not connect
    const result = await mongoose.connect(this.settings.databaseUri)
    if(result) this.logger.info(`database connected on: ${this.settings.databaseUri}`)
  }
}
