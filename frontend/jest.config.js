const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
module.exports = createJestConfig(customJestConfig)

// module.exports = {
//   // The root of your source code, typically /src
//   // `<rootDir>` is a token Jest substitutes
//   roots: ["<rootDir>"],

//   // Jest transformations -- this adds support for TypeScript
//   // using ts-jest
//   transform: {
//     "^.+\\.tsx?$": "ts-jest"
//   },
//   testEnvironment: 'jsdom',

//   // Runs special logic, such as cleaning up components
//   // when using React Testing Library and adds special
//   // extended assertions to Jest
//   setupFilesAfterEnv: [
//     // "@testing-library/react/cleanup-after-each",
//     "@testing-library/jest-dom/extend-expect",
//     // "<rootDir>/jest.setup.js"
//   ],

//   // Test spec file resolution pattern
//   // Matches parent folder `__tests__` and filename
//   // should contain `test` or `spec`.
//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",

//   // Module file extensions for importing
//   moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"]
// };