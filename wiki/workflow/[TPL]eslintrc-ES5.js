module.exports = {
  "env": {
      "browser": true,
      "worker": true,
      "jquery": true,
      "serviceworker": true,
      "es6": false,
      "node": true
  },
  "extends": "airbnb-base/legacy",
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

/*
  npm install --save-dev eslint-config-airbnb-base eslint@^3.0.1 eslint-plugin-import@^1.10.3

  cf: https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb-base
*/