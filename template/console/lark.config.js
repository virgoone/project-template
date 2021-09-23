module.exports = {
  variables: {
    APP_TITLE: '[Lark]',

    SENTRY_DSN: undefined

    // 可选，start 时默认为 true，build 时默认为 false
    // __DEV__,

    // 可选，当前 Commit hash
    // GIT_COMMIT_SHA,

    // 可选
    // SENTRY_RELEASE: `${APP_ENV}-${GIT_COMMIT_SHA.substr(0, 7)}`,

    // 可选，从process.env获取
    // APP_ENV,

    // 可选，默认值从 package.json 中获取
    // APP_NAME,

    // 可选
    // PUBLIC_PATH,
  },
  paths: {
    // 可选，默认值 ./src/index.tsx
    // appIndex,
    // 可选，默认值 ./src
    // appSrc,
    // 可选，默认值 ./dist
    // appBuild,
    // 可选，默认值 ./public
    // appPublic,
    // 可选，默认值 ./yarn.lock
    // yarnLockFile,
    // 可选，默认值 ./package.json
    // appPackageJson,
  },
  configureWebpack: (config) => {
    // config 即为最终生成的 webpack config，若函数有返回值则与原 config 进行 webpack-merge
    // 可直接修改原 config，但不要返回任何内容
  }
}
