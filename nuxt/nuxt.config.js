module.exports = {
  head: {
    title: 'moleculer + nuxt.js',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: ''}
    ]
  },
  modules: [
    ['@nuxtjs/axios', {baseURL: process.env.BASE_URL || 'http://localhost:3001'}],
    'nuxt-buefy'
  ],
  build: {
    extend (config, {isDev, isClient}) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
      }
    }
  }
}
