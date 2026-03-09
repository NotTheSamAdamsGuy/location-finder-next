import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";

const eslintConfig = [...nextCoreWebVitals, ...nextTypescript, {
  ignores: [
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "coverage/**"
  ],
}, {
  plugins: {
    import: importPlugin
  },
  rules: {
    "import/order": [
      "error",
      {
        "groups": ["builtin", "external", "internal", "parent", "sibling", "index"], // Define custom groups
        "newlines-between": "always", // Add blank lines between groups
        "alphabetize": {
          "order": "asc", // Sort alphabetically within groups
          "caseInsensitive": true
        }
      }
    ]
  }
}];

export default eslintConfig;
