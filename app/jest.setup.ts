import { jest } from '@jest/globals';

jest.mock('react-native', () => ({
  // Provide minimal mocks for things we import
  Platform: { OS: 'ios' },
}));

jest.mock('react-native-openai', () => {
  return jest.fn().mockImplementation(() => ({
    images: {
      generate: jest.fn(),
      edit: jest.fn(),
    },
  }));
});

jest.mock('expo-constants', () => ({
  expoConfig: { extra: { OPENAI_API_KEY: 'test' } },
})); 