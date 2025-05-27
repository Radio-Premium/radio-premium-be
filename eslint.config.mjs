import js from "@eslint/js";
import pluginImport from "eslint-plugin-import";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    extends: ["plugin:import/recommended"],
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      globals: globals.node,
      ecmaVersion: "latest",
      sourceType: "module",
    },
    plugins: {
      import: pluginImport,
    },
    rules: {
      ...js.configs.recommended.rules,
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
            "object",
            "type",
          ],
          pathGroups: [
            {
              pattern: "@/**",
              group: "internal",
            },
          ],
          "newlines-between": "always",
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],
    },
  },
]);
