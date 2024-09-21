import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import svelteConfig from './svelte.config.js';
import eslintPluginSvelte from "eslint-plugin-svelte";

export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      parserOptions: {
        svelteConfig,
      },
    },
  },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginSvelte.configs["flat/prettier"],
  ...eslintPluginSvelte.configs["flat/recommended"],
];
