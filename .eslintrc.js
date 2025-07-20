module.exports = {
  extends: [
    'react-app',
    'react-app/jest'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { 
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      ignoreRestSiblings: true 
    }],
    'no-unused-vars': 'off', // Отключаем базовое правило в пользу TypeScript версии
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  }
}; 