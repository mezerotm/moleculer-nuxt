const mongoose = require('mongoose');

module.exports = {
  name: 'database',
  settings: {
    //TODO: allow custom database URI through api? (www.service.js)
    databaseUri: process.env.DATABASE_URI || "mongodb://localhost:27017"
  },
  actions: {
    put: {
      params: {
        model: {type: 'string', min: 1, max: 64},
        schema: {type: 'object'}
      },
      handler(ctx) {
        const name = ctx.params.name
        const ctxSchema = ctx.params.schema

        const schema = new mongoose.Schema(ctxSchema)
        mongoose.model(name, schema)
      }
    },
    post: {
      params: {
        model: {type: 'string', min: 1, max: 64},
        entries: {type: 'array', min: 1}
      },
      async handler(ctx) {
        const entries = ctx.params.entries

        const model = this.getModel(ctx)
        return await model.insertMany(entries)
      }
    },
    get: {
      params: {
        model: {type: 'string', min: 1, max: 64}
      },
      handler(ctx) {
        const model = this.getModel(ctx)
        return model.schema
      }
    },
    delete: {
      params: {
        model: {type: 'string', min: 1, max: 64}
      },
      handler(ctx) {
        const model = this.getModel(ctx)
        model.collection.drop()
      }
    },
    find: {
      handler() {

      }
    }
  },
  methods: {
    getModel(ctx) {
      return mongoose.model(ctx.params.model)
    }
  },
  //TODO: add moleculer event listener to listen to mongoose streams for logging
  async created() {
    //TODO: do something if database does not connect
    const result = await mongoose.connect(this.settings.databaseUri)
    if(result) this.logger.info(`database connected on: ${this.settings.databaseUri}`)
  }
}
