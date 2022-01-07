interface Window {
  __webpack_public_path__: string
  __APP_LOADED__: boolean
  wxjs_is_wkwebview: any
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly __DEV__: 'development' | 'production' | 'test'
  }
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

declare module '*.avif' {
  const src: string
  export default src
}

declare module '*.bmp' {
  const src: string
  export default src
}

declare module '*.gif' {
  const src: string
  export default src
}

declare module '*.jpg' {
  const src: string
  export default src
}

declare module '*.jpeg' {
  const src: string
  export default src
}

declare module '*.png' {
  const src: string
  export default src
}

declare module '*.webp' {
  const src: string
  export default src
}

declare module '*.svg' {
  import * as React from 'react'

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >

  const src: string
  export default src
}

declare module '*.css' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.less' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*.sass' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '*?modules' {
  const classes: { readonly [key: string]: string }
  export default classes
}

declare module '@arco-design/color'
