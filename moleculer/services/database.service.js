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
        model: {type: 'string', min: 1, max: 64, optional: false},
        schema: {type: 'object', optional: false}
      },
      handler(ctx) {
        const model = ctx.params.model
        const ctxSchema = ctx.params.schema

        const schema = new mongoose.Schema(ctxSchema)
        mongoose.model(model, schema)
      }
    },
    post: {
      params: {
        model: {type: 'string', min: 1, max: 64, optional: false},
        entries: {type: 'array', min: 1, optional: false}
      },
      async handler(ctx) {
        const entries = ctx.params.entries

        const model = this.getModel(ctx)
        return await model.insertMany(entries)
      }
    },
    get: {
      params: {
        model: {type: 'string', min: 1, max: 64, optional: false}
      },
      handler(ctx) {
        const model = this.getModel(ctx)
        return model.schema
      }
    },
    delete: {
      params: {
        model: {type: 'string', min: 1, max: 64, optional: false}
      },
      handler(ctx) {
        const model = this.getModel(ctx)
        model.collection.drop()
      }
    },
    find: {
      params: {
        model: {type: 'string', min: 1, max: 64, optional: false},
        query: {type: 'object', optional: false},
        projection: {type: 'object', optional: true},
        options: {type: 'object', optional: true}
      },
      async handler(ctx) {
        const query = ctx.params.query
        const projection = ctx.params.projection
        const options = ctx.params.options

        const model = this.getModel(ctx)
        return await model.find(query, projection, options)
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
