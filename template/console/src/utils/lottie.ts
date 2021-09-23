export default () =>
  // eslint-disable-next-line implicit-arrow-linebreak
  import(/* webpackChunkName: "lottie-web" */ 'lottie-web').then(
    (value) => value.default
  )
