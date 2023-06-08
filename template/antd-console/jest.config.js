// downgrade to jest 22
// see https://github.com/facebook/jest/issues/6025
module.exports = {
  collectCoverage: true,
  coverageReporters: ['text', 'html', 'json', 'lcov'],
  setupFiles: ['./tests/setup.js'],
  testPathIgnorePatterns: ['/node_modules/'],
  collectCoverageFrom: [
    'src/components/**/*.{js,jsx}',
    'src/utils/**/*.{js,jsx}',
  ],
  transform: {
    '\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  snapshotSerializers: ['enzyme-to-json/serializer'],
  moduleNameMapper: {
    '\\.\\/style$': '<rootDir>/tests/__mocks__/style.js',
    '\\.less$': '<rootDir>/tests/__mocks__/style.js',
    '\\.svg$': '<rootDir>/tests/__mocks__/svg.js',
  },
  moduleFileExtensions: ['js', 'json', 'jsx', 'node', 'scss', 'less'],
  globals: {
    __DEV__: false,
  },
}
