const { defaults } = require('jest-config');
const { defaults: tsPreset } = require('ts-jest/presets');

module.exports = {
  ...defaults,
  collectCoverage: false,
  coverageReporters: ['lcov', 'text'],
  errorOnDeprecated: true,
  resetMocks: true,
  testMatch: [
    "**/src/?(*.)+(spec|test).[jt]s?(x)"
  ],
  transform: {
    ...defaults.transform,
    ...tsPreset.transform
  },
};
