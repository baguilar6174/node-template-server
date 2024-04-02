import type {Config} from 'jest';

const config: Config = {
	collectCoverage: true,
	coverageDirectory: "coverage",
  coverageProvider: "v8",
  preset: 'ts-jest',
  testEnvironment: "jest-environment-node",
};

export default config;