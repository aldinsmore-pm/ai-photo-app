const dotenv = require('dotenv');
const { resolve } = require('path');

dotenv.config({ path: resolve(__dirname, '.env') });

/**
 * @param {{ config: import('@expo/config-types').ExpoConfig }} param0 
 */
module.exports = ({ config }) => {
  return {
    ...config,
    extra: {
      ...config.extra,
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      OPENAI_ORG_ID: process.env.OPENAI_ORG_ID,
    },
    ios: {
      ...config.ios,
      infoPlist: {
        ...(config.ios?.infoPlist ?? {}),
        NSCameraUsageDescription: 'This app needs camera access to capture photos for AI enhancements.',
        NSPhotoLibraryAddUsageDescription: 'Allows the app to save your AI-enhanced photos to your gallery.',
        NSPhotoLibraryUsageDescription: 'Allows the app to select existing photos to enhance with AI.',
      },
    },
  };
}; 