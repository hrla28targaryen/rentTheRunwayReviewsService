module.exports = {
    testEnvironment: 'node',
    "verbose": true,
    "clearMocks": true,
    "collectCoverage": true,
    setupFiles: ['<rootDir>/client/enzyme.js'],
    "moduleNameMapper": {
        "^.+\\.(css|less|scss)$": "babel-jest"
      }
}