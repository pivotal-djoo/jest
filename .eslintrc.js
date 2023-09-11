/* eslint-env node */
module.exports = {
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: { project: ['./tsconfig.json'] },
  plugins: ['@typescript-eslint'],
  root: true,
  rules: {
    '@typescript-eslint/strict-boolean-expressions': [
      2,
      {
        "allowString" : false,
        "allowNumber" : false
      }
    ]
  },
  env: {
    browser: true,
    node: true
  },
  ignorePatterns: ['**/dist/*', 'src/**/*.test.ts*', '.eslintrc.js']
};

