/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */

const config = {
  workerIdleMemoryLimit: '850mb',
  clearMocks: true,
  testEnvironment: 'node',
  collectCoverage: false,
  coverageDirectory: 'coverage',
  moduleDirectories: ['node_modules', 'ttinylisp'],
  moduleFileExtensions: ['js', 'json'],
  modulePathIgnorePatterns: ['<rootDir>/dist'],
  roots: ['<rootDir>'],
  testMatch: ['**/specs/*_spec.js'],
  globals: {
    fetch: global.fetch,
  },
};

module.exports = config;
