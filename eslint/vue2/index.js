module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  extends: [
    "eslint:recommended",
  ],
  overrides: [
    {
      files: ['**/*.vue'],
      extends: ['./vue'],
    },
  ],
};
