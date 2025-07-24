import Constants from 'expo-constants';

// Reads API keys from environment variables set by Expo config plugins or dotenv.
// Throws an error during app startup if a required key is missing.

const { OPENAI_API_KEY, OPENAI_ORG_ID } = Constants?.expoConfig?.extra ?? {};

if (!OPENAI_API_KEY) {
  throw new Error('Missing OPENAI_API_KEY. Add it to your .env and app.json extra section.');
}

export const ENV = {
  OPENAI_API_KEY,
  OPENAI_ORG_ID,
}; 