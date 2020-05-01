module.exports = {
  "env": {
      "browser": true,
      "worker": true,
      "jquery": true,
      "serviceworker": true,
      "es6": true,
      "node": true
  },
  "extends": "airbnb-base",
  "globals": {
    "Vue": true,
    "svg4everybody": true,
    "FontFaceObserver": true,
    "CONFIG": true,
    "Routing": true,
    "language": true,
    "market": true,
    "mdmHost": true,
    "mdmUrls": true
  },
  "rules": {
    "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": false, "peerDependencies": false}]
  }
};