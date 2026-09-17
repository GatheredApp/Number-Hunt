import js from '@eslint/js';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import hooks from 'eslint-plugin-react-hooks';
import refresh from 'eslint-plugin-react-refresh';
export default tseslint.config(
  {ignores:['dist','vite.config.js','vite.config.d.ts']},
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {files:['**/*.{ts,tsx}'],languageOptions:{globals:globals.browser},plugins:{'react-hooks':hooks,'react-refresh':refresh},rules:{...hooks.configs.recommended.rules,...refresh.configs.vite.rules,'@typescript-eslint/no-explicit-any':'off','react-hooks/set-state-in-effect':'off'}},
);
