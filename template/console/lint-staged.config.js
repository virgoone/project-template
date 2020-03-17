module.exports = {
  '*.{js,jsx,ts,tsx}': ['eslint --fix', 'git add'],
  '*.{css,less}': ['stylelint --fix', 'git add'],
}
