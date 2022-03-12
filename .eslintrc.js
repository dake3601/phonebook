module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    'no-console': 0,
    'no-unused-vars': ['error', { argsIgnorePattern: 'error|request|response|next' }],
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'consistent-return': 0,
  },
};
