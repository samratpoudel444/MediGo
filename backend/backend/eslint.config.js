import js from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";
import { defineConfig } from "eslint-define-config";

export default defineConfig([
  js.configs.recommended,

  {
    files: ["**/*.js"],
    plugins: {
      prettier: prettierPlugin,
    },
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      globals: {
        console: "readonly",
        process: "readonly",
        __dirname: "readonly",
        module: "readonly",
        require: "readonly",
      },
    },
    rules: {
      "prettier/prettier": "error",
      "no-unused-vars": [
        "warn",
        { vars: "all", args: "after-used", ignoreRestSiblings: true },
      ],
    },
  },
]);
