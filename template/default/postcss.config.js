module.exports = {
  plugins: [
    require('postcss-import'),
    require('autoprefixer'),
    {{#if mobile}}
    'postcss-pxtorem': { rootValue: 37.5, propWhiteList: [] }
    {{/if}}
  ]
}
