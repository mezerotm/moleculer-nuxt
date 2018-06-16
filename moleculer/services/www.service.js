const webService = require('moleculer-web')

module.exports = {
  name: 'www',
  mixins: [webService],
  settings: {
    port: process.env.SERVER_PORT || 3001,
    cors: true,
    authorization: true,
    routes: [{
      aliases: {
        '/': 'www.index',
        'POST users': 'users.create'
      }
    }]
  },
  methods: {}
}
