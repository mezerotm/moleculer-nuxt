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
  methods: {
    async authorize(ctx, route, req) {
      //TODO: refactor
      let token;
			if (req.headers.authorization) {
				let type = req.headers.authorization.split(" ")[0];
				if (type === 'Token' || type === 'Bearer') {
					token = req.headers.authorization.split(" ")[1];
        }
			}

      try {
        const user = await ctx.call('users.resolveToken', {token})
        if(user) {
          this.logger.info(`authenticated jwt: ${user._id}`)
          ctx.mata.user = users
          ctx.mera.token = token
        } else {
          //TODO: figure out what to do
          return console.error('no user')
        }
      } catch (error) {
        //TODO: figure out how to properly log this
        return console.error(error)
      }
		}
  }
}
