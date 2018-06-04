const express = require('express')
const cors = require('cors')

module.exports = {
  name: 'www',
  settings: {
    port: process.env.PORT || 3001
  },
  methods: {
    initRoutes(app) {
      app.get('/', this.index)
    },
    index(req, res) {
      res.send({
        message: 'Hello from moleculer + express'
      })
    }
  },
  created() {
    const app = express()

    app.use(cors())

    this.initRoutes(app)
    this.app = app
  },
  started() {
    this.app.listen(this.settings.port, error => {
      if(error) return this.broker.fatal(error)
      this.logger.info(`Listening on: ${this.settings.port}`)
    })
  },
  stopped() {

  }
}
