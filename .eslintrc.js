const fs = require('fs');
const path = require('path');

const prettierOptions = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, '.prettierrc'), 'utf8'),
);

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb', 
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['tsconfig.json'],
  },
  plugins: ['prettier', 'react', '@typescript-eslint'],
  rules: {
    'prettier/prettier': ['warn', prettierOptions],
    "object-curly-newline": ['warn', {
      "ObjectPattern": { 'multiline': true },}
    ],
    "arrow-parens": ["warn", "as-needed"],
    "react/jsx-props-no-spreading": 'off',
    'operator-linebreak': ["warn", "before", {"overrides": { 
      "=": "after",  
      "&&": "after", 
      "||": "after",
    }}],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  overrides: [
    {
      files: ['**/*.ts?(x)'],
      rules: { 'prettier/prettier': ['warn', prettierOptions] },
    },
  ],
};
