const webService = require('moleculer-web')

module.exports = {
  name: 'www',
  mixins: [webService],
  settings: {
    port: process.env.SERVER_PORT || 3001,
    cors: true,
    // authorization: true,
    routes: [{
      aliases: {
        '': 'www.index',
        'POST users': 'users.create'
      }
    }]
  },
  methods: {
    // authorize(ctx, route, req) {
		// 	let token;
		// 	if (req.headers.authorization) {
		// 		let type = req.headers.authorization.split(" ")[0];
		// 		if (type === "Token" || type === "Bearer")
		// 			token = req.headers.authorization.split(" ")[1];
		// 	}
    //
		// 	return this.Promise.resolve(token)
		// 		.then(token => {
		// 			if (token) {
		// 				// Verify JWT token
		// 				return ctx.call("users.resolveToken", { token })
		// 					.then(user => {
		// 						if (user) {
		// 							this.logger.info("Authenticated via JWT: ", user.username);
		// 							// Reduce user fields (it will be transferred to other nodes)
		// 							ctx.meta.user = _.pick(user, ["_id", "username", "email", "image"]);
		// 							ctx.meta.token = token;
		// 						}
		// 						return user;
		// 					})
		// 					.catch(err => {
		// 						// Ignored because we continue processing if user is not exist
		// 						return null;
		// 					});
		// 			}
		// 		})
		// 		.then(user => {
		// 			if (req.$endpoint.action.auth == "required" && !user)
		// 				return this.Promise.reject(new UnAuthorizedError());
		// 		});
		// }
  }
}
