module.exports = {
  testEnvironment: "node",
  testMatch: ["**/**/**/*.test.ts"],
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageReporters: ["text", "lcov"],
  verbose: true,
  preset: "ts-jest",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleFileExtensions: ["ts", "js", "json", "node"],
  setupFiles: ["<rootDir>/__mocks__/setup.ts"],
};
