module.exports = {
    "verbose": true,
    "clearMocks": true,
    "collectCoverage": true,
    setupFiles: ['<rootDir>/client/enzyme.js'],
    "transform": {
        "^.+\\.jsx?$": "babel-jest"
    },
    "moduleNameMapper": {
        "moduleNameMapper": {
            "\\.(css|less|scss)$": "identity-obj-proxy"
          },
        "transform": {
            "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/fileTransformer.js"
          }
    }
}