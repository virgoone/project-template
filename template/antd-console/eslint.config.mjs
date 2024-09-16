import antfu from '@antfu/eslint-config'

export default antfu({
  typescript: true,
  ignores: ['**/scripts'],
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: 'single', // or 'double'
  },
  rules: {
    'unused-imports/no-unused-vars': ['warn'],
    'no-console': ['warn'],
    'prefer-regex-literals': ['warn'],
    'style/multiline-ternary': ['warn'],
    'ts/ban-ts-comment': ['warn'],
    'array-callback-return': ['warn'],
    'unicorn/no-new-array': ['warn'],
    'ts/no-require-imports': ['warn'],
    'node/prefer-global/process': ['warn'],
  },
})
