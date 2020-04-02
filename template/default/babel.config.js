module.exports = api => {
  api.cache(true)

  return {
    plugins: [
      [
        "import",
        {
          "libraryName": "antd",
          "libraryDirectory": "lib",
          "style": "css"
        },
      ]
    ],
  }
}
