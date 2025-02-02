export default {
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Mock image imports
    "\\.(jpg|jpeg|png|gif|webp|svg)$": "<rootDir>/__mocks__/fileMock.js",
  },
};
