module.exports = {
  extends: 'lark',
  rules: {
    'react/display-name': 0,
    'react/destructuring-assignment': 2,
    'import/no-unresolved': [
      2,
      {
        ignore: ['^@/'] // @ 是设置的路径别名
      }
    ]
  },
  globals: {
    __DEV__: true,
    __webpack_public_path__: true,
    __APP_LOADED__: true,
    eruda: true,
    SENTRY_DSN: true,
    APP_ENV: true,
    SENTRY_RELEASE: true,
    VERSION: true
  }
}
