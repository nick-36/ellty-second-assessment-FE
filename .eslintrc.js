module.exports = {
  parser: "@babel/eslint-parser",
  extends: [
    "next/typescript",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
    es2020: true,
  },
  rules: {
    "no-extra-semi": 1,
    "no-inner-declarations": 2,
    "react/no-unescaped-entities": "off",
    "no-eval": 2,
    "no-extend-native": 2,
    "no-new-wrappers": 2,
    "no-with": 2,
    "no-return-await": 2,
    "no-var": 1,
    "no-unused-vars": "off", // Disable the base rule
    "@typescript-eslint/no-unused-vars": [
      "warn", // Set to "warn" or "error" as per your preference
      {
        argsIgnorePattern: "^_", // Ignore unused arguments starting with _
        varsIgnorePattern: "^_", // Ignore unused variables starting with _
        caughtErrorsIgnorePattern: "^_", // Ignore unused caught errors starting with _
      },
    ],
    "prefer-const": [
      "error",
      {
        destructuring: "all",
        ignoreReadBeforeAssign: false,
      },
    ],
    "no-array-constructor": 2,
    "no-new-object": 2,
    "react/prop-types": 0,
    "react/no-find-dom-node": 0,
    "no-console": 1,
    "react/display-name": "off",
    "react/react-in-jsx-scope": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "no-warning-comments": 0,
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-expressions": "off",
  },
  overrides: [
    {
      files: ["**/*.ts", "**/*.tsx"],
      plugins: ["@typescript-eslint"],
      parser: "@typescript-eslint/parser",
      rules: {
        "no-use-before-define": "off", // Disable base rule
        "@typescript-eslint/no-use-before-define": "off", // Use TypeScript-specific rule
        "no-unsafe-optional-chaining": "off",
        " @typescript-eslint/no-explicit-any": "off",
      },
    },
  ],
  settings: {
    eslint: {
      packageManager: "npm",
    },
  },
};
