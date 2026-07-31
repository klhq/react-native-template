const IS_DEV = process.env.APP_ENV === 'development';

/** @type {import('expo/config').ExpoConfig} */
module.exports = {
  name: IS_DEV ? 'react-native-template (dev)' : 'react-native-template',
  slug: 'react-native-template',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'light',
  ios: {
    supportsTablet: true,
    bundleIdentifier: IS_DEV ? 'app.klh.rntemplate.dev' : 'app.klh.rntemplate',
  },
  android: {
    package: IS_DEV ? 'app.klh.rntemplate.dev' : 'app.klh.rntemplate',
    adaptiveIcon: {
      backgroundColor: '#E6F4FE',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
  },
  web: {
    favicon: './assets/favicon.png',
  },
  plugins: ['expo-asset'],
};
