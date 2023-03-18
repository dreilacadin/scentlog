// In the following statement, replace `./tsconfig` with the path to your `tsconfig` file
// which contains the path mapping (ie the `compilerOptions.paths` option):
import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  clearMocks: true,

  displayName: "backend tests",
  coverageProvider: "v8",
  preset: "ts-jest/presets/js-with-ts",
  setupFiles: ["dotenv/config"],
  setupFilesAfterEnv: ["<rootDir>/src/tests/helpers/setup.ts"],
  transform: {
    "^.+\\.mjs$": "ts-jest",
  },
  roots: ["<rootDir>"],
  moduleNameMapper: {
    "^~/prisma/(.*)$": "<rootDir>/prisma/$1",
    "^~/(.*)$": "<rootDir>/src/$1",
  },
};

export default jestConfig;
