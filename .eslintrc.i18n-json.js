const path = require('path')

module.exports = {
  extends: ['plugin:i18n-json/recommended'],
  ignorePatterns: ['mexican.json'],
  rules: {
    'i18n-json/identical-keys': [
      2,
      {
        filePath: {
          'admin.json': path.resolve('./src/i18n/translations/es/admin.json'),
          'common.json': path.resolve('./src/i18n/translations/es/common.json'),
          'components.json': path.resolve(
            './src/i18n/translations/es/components.json',
          ),
          'data.json': path.resolve('./src/i18n/translations/es/data.json'),
          'views.json': path.resolve('./src/i18n/translations/es/views.json'),
          'scoreCard.json': path.resolve(
            './src/i18n/translations/es/scoreCard.json',
          ),
        },
      },
    ],
  },
}
