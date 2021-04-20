module.exports = {
    root: true,
    env: {
      browser: true,
      node: true
    },
    extends: [
    ],
    plugins: [],
    // add your custom rules here
    rules: {
      'no-console': 'off',
      'require-await': 'off',
      'import/order': 'off'
    },
    overrides: [],
    parserOptions: {
        "ecmaVersion": 2017
    },

    env: {
        "es6": true
    }
  }
  