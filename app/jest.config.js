module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  setupFiles: ['<rootDir>/jest.setup.ts'],
  resetMocks: true,
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|react-native-openai|@react-native|react-native-.*)/)',
  ],
}; 