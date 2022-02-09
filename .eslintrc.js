module.exports = {
  "extends": ["taro/react"],
  "rules": {
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "off",
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx", ".tsx"] }]
  },
  "parser": "babel-eslint",
  "globals": {
    "TARO_APP": "readonly",
    "wx": "readonly",
    "APP_NAME": "readonly",
    "APP_VERSION": "readonly",
    "API_HOST": "readonly",
    "APP_BASE_URL": "readonly",
    "APP_WEBSOCKET_URL": "readonly",
    "APP_INTEGRATION": "readonly",
    "APP_COMPANY_ID": "readonly",
    "APP_PLATFORM": "readonly",
    "APP_CUSTOM_SERVER": "readonly",
    "APP_HOME_PAGE": "readonly",
    "APP_AUTH_PAGE": "readonly",
    "APP_MAP_KEY": "readonly",
    "APP_MAP_NAME": "readonly",
    "_MEIQIA": "readonly",
    "APP_TRACK": "readonly"
  }
}
