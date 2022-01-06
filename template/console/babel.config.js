module.exports = (api) => {
  return {
    plugins: [
      [
        'babel-plugin-import',
        {
          libraryName: '@arco-design/web-react',
          libraryDirectory: 'lib',
          camel2DashComponentName: false,
          style: 'css', // 样式按需加载
        },
        '@arco-design/web-react',
      ],
      [
        'babel-plugin-import',
        {
          libraryName: '@arco-design/web-react/icon',
          libraryDirectory: 'react-icon',
          camel2DashComponentName: false,
        },
        '@arco-design/web-react/icon',
      ],
    ],
  }
}
