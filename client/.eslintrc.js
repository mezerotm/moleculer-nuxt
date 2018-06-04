module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'standard',
		'plugin:vue/strongly-recommended'
  ],
  plugins: [
    'vue'
  ]
}
