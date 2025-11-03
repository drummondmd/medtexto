import next from "eslint-config-next/core-web-vitals";
import tsParser from "@typescript-eslint/parser";
import tseslint from "@typescript-eslint/eslint-plugin";
import importPlugin from "eslint-plugin-import";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  ...next,
  prettierConfig,

  // 🌐 Configuração global para TS e JS
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: [
      ".next/**",
      "out/**",
      "build/**",
      "node_modules/**",
      "dist/**",
      "next-env.d.ts",
    ],

    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        project: "./tsconfig.json",
      },
    },

    plugins: {
      "@typescript-eslint": tseslint,
      import: importPlugin,
      prettier: prettierPlugin,
    },

    rules: {
      // ✅ Lint + Prettier
      "prettier/prettier": ["warn"],

      // ✅ Boas práticas gerais
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "prefer-const": "warn",

      // ✅ React / Next.js
      "react/react-in-jsx-scope": "off",
      "react/no-unescaped-entities": "off",

      // ✅ Organização de imports
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling", "index"]],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
    },
  },

  // ⚙️ Exceção: arquivos JS/JSX sem TypeScript type-check
  {
    files: ["**/*.js", "**/*.jsx"],
    languageOptions: {
      parserOptions: {
        project: null, // 🚫 desativa uso do tsconfig nesses arquivos
      },
    },
    rules: {
      // mantém apenas regras de JS básicas
      "no-unused-vars": "warn",
      "no-undef": "off", // evita falsos positivos
    },
  },
]);
