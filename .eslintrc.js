// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require("path");

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "next",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "import"],
  rules: {
    // Specifies next pages directory path: https://github.com/vercel/next.js/discussions/24254
    "@next/next/no-html-link-for-pages": [
      2,
      path.join(__dirname, "client/src/pages"),
    ],
    "import/no-duplicates": "error",
    "import/no-unresolved": "error",
    "import/order": [
      "error",
      {
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "next/**",
            group: "builtin",
            position: "before",
          },
          {
            group: "internal",
            pattern: "shared/**",
          },
          {
            group: "internal",
            pattern: "client/**",
          },
          {
            group: "internal",
            pattern: "server/**",
          },
        ],
      },
    ],
    "@typescript-eslint/no-empty-interface": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "@typescript-eslint/no-var-requires": 0,
    "@typescript-eslint/no-unused-vars": 0,
    "@typescript-eslint/no-non-null-assertion": 0,
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true, // always try to resolve types under `<root>@types` directory even it doesn't contain any source code, like `@types/unist`,
        directory: ".",
      },
    },
    react: {
      version: "detect",
    },
  },
};
