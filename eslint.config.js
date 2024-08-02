import { defineConfig } from 'eslint';

export default defineConfig({
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'prettier'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'
  ],
  rules: {
    'no-console': 'warn',
    'prettier/prettier': 'error'
  },
  ignorePatterns: ['dist/**', 'node_modules/**'] 
});
