/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  moduleNameMapper: {
    // Позволяет Jest игнорировать импорты CSS и алиасы
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@/(.*)$": "<rootDir>/src/$1", // если ты используешь алиас @/ для src/
  },
  setupFilesAfterEnv: ["<rootDir>/src/jest.setup.ts"],
};
