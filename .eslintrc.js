module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2020: true,
    mocha: true
  },
  extends: [
    "airbnb-base",
    "plugin:mocha/recommended"
  ],
  plugins: [
    "mocha"
  ],
  parserOptions: {
    ecmaVersion: 11,
  },
  rules: {
    "import/newline-after-import": "off",
    quotes: [2, "double", { avoidEscape: true }],
    "comma-dangle": "off",
    "no-underscore-dangle": "off",
    "mocha/no-hooks-for-single-case": "off"
  },
  overrides: [
    {
      files: [
        "resources/**/tests/**/*.js"
      ],
      rules: {
        "import/no-extraneous-dependencies": "off",
        "prefer-arrow-callback": "off",
        "func-names": "off"
      }
    },
    {
      files: [
        "db/models/index.js"
      ],
      rules: {
        "import/no-dynamic-require": "off",
        "global-require": "off",
        "arrow-body-style": "off"
      }
    },
    {
      files: [
        "./index.js"
      ],
      rules: {
        "no-console": "off"
      }
    }
  ]
};
