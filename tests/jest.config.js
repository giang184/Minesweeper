const path = require('path')

module.exports = {
  rootDir: path.resolve(__dirname, '..'),
  setupFilesAfterEnv: [
    '<rootDir>/tests/setup.js',
  ],
  moduleFileExtensions: [
    'js',
    'json',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
  },
  coverageDirectory: '<rootDir>/tests/coverage',
  collectCoverageFrom: [
    'src/lib/*.js',
    '!src/main.js',
    '!**/node_modules/**',
  ],
}
