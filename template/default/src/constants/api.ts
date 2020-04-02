import pickEnv from 'penv.macro'

export const URL_API_VIRA = pickEnv({
  production: 'xxx',
  develop: 'xxx',
  local: 'http://xxx/api',
})
