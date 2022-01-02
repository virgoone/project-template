interface Window {
  __webpack_public_path__: string
  __APP_LOADED__: boolean
  wxjs_is_wkwebview: any
}

interface NodeModule {
  hot: any
}

interface ESModule {
  __esModule: boolean
  default: any
}

declare let __webpack_public_path__: string

declare const __DEV__: boolean
declare const SENTRY_DSN: string
declare const APP_ENV: string
declare const SENTRY_RELEASE: string

declare module 'penv.macro'

declare module 'debug'

declare module '*.svg' {
  const content: any
  export default content
}

declare module '*.less' {
  const classes: { [className: string]: string }
  export default classes
}
declare module '*.less?modules' {
  const classes: { [className: string]: string };
  export default classes;
}
declare module '*.scss' {
  const classes: { [className: string]: string }
  export default classes
}
declare module '*.scss?modules' {
  const classes: { [className: string]: string };
  export default classes;
}

declare module '*/settings.json' {
  const value: {
    colorWeek: boolean
    navbar: boolean
    menu: boolean
    footer: boolean
    themeColor: string
    menuWidth: number
  }

  export default value
}

declare module '*.png' {
  const value: string
  export default value
}
