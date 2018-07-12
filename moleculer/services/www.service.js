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
        'GET /': 'www.index',
        'POST /': 'www.postIndex',

        'PUT database': 'database.put',
        'POST database': 'database.post',
        'GET database': 'database.get',
        'DELETE database': 'database.delete',
        'POST database/find': 'database.find'
      }
    }]
  },
  actions: {
    index () {
      return '\'/\': \'www.index\''
    },
    postIndex (ctx) {
      return ctx.params
    }
  },
  methods: {},
  created () {}
}
