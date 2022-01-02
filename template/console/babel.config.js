module.exports = (api) => {
  api.cache(true)

  return {
    plugins: [
      [
        'babel-plugin-import',
        {
          libraryName: '@arco-design/web-react',
          libraryDirectory: 'es',
          camel2DashComponentName: false,
          style: true // 样式按需加载
        }
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@arco-design/web-react/icon',
          libraryDirectory: 'react-icon',
          camel2DashComponentName: false
        }
      ]
    ]
  }
}
