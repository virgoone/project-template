import pickEnv from 'penv.macro'

export const URL_API_BASE = pickEnv({
  production: 'xxx',
  develop: 'xxx',
  local: 'http://xxx/api'
})

export default {
  URL_API_BASE
}
