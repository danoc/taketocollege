module.exports = {
  parserOptions: {
    ecmaVersion: 8,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    browser: true,
    node: true
  },
  extends: ["airbnb", "prettier"],
  globals: {
    ga: false,
    graphql: false,
    URL: false
  },
  settings: { "import/core-modules": ["tachyons"] },
  rules: {
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        specialLink: ["to"]
      }
    ],
    "import/no-extraneous-dependencies": "off"
  }
};
