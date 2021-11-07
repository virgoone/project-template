/**
 * type(scope): subject/header
 * body
 * footer
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 允许中文
    'scope-case': [0],
    'subject-case': [0],
    'header-max-length': [2, 'always', 108]
  }
}
