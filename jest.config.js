/** @type {import('jest').Config} */
module.exports = {
  clearMocks: true,
  restoreMocks: true,
  testEnvironment: 'node',
  testMatch: ['<rootDir>/specs/**/*_spec.js'],
};
