const path = require('path');

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.jsx', '.ts', '.tsx', '.json'],
        alias: {
          '@': path.resolve(__dirname, 'src'),
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        envName: 'ENV',
        moduleName: '@env',
        path: '.env',
      },
    ],
  ],
};
