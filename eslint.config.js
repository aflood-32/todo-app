import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import tseslint from 'typescript-eslint'
import simpleImportSort from "eslint-plugin-simple-import-sort";


export default tseslint.config(
  { ignores: ['dist'] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.strictTypeChecked, ...tseslint.configs.stylisticTypeChecked, eslintPluginPrettierRecommended],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname
        }
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'simple-import-sort': simpleImportSort,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      'simple-import-sort/imports': [
         'error',
            { groups: [
                    // Packages `react` related packages come first.
                    ['^react', '^\\w', '^@hookform', '^@testing-library'],
                    // npm packages
                    // Anything that starts with a letter (or digit or underscore), or `@` followed by a letter.
                    // ['^\\w'],
                    // Internal packages.

                    // Imports from 'entities' layer.
                    ['^@/entities'],

                    // Imports from 'features' layer.
                    ['^@/features'],

                    // Imports from 'widgets' layer.
                    ['^@/widgets'],

                    // Imports from 'pages' layer.
                    ['^@/pages'],

                    ['^@/shared'],

                    // Side effect imports.
                    ['^\\u0000'],
                    // Parent imports. Put `..` last.
                    ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
                    // Other relative imports. Put same-folder imports and `.` last.
                    ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
                    // Style imports.
                    ['^.*\\.styled\\.ts$'],
                ] }
        ],
        'simple-import-sort/exports': 'error',
    },
  },
)
