import globals from "globals";
import pluginJs from "@eslint/js";

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    // Apply this to all Javascript files
    files: ["**/*.js"],
    languageOptions: { 
      sourceType: "module",
      ecmaVersion: "latest",
      globals: {
        ...globals.node, 
      } 
    },
    rules: {
      ...pluginJs.configs.recommended.rules,
      "no-unused-vars": "error", 
      "no-undef": "error",
      "no-console": "off",
    }
  }
];