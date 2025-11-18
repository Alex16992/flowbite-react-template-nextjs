import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import pluginImport from 'eslint-plugin-import';
import pluginUnusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';
import fs from 'fs';
import path from 'path';

// Слои FSD архитектуры
const fsdLayers = ['widgets', 'features', 'entities', 'shared', 'pages', 'processes', 'app'];

// Функция для получения списка папок в заданном слое
const getFoldersInLayer = (layer) => {
  const layerDir = path.resolve(`./src/${layer}`);
  let folders = [];

  try {
    if (fs.existsSync(layerDir)) {
      folders = fs.readdirSync(layerDir, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);
    }
  } catch (err) {
    console.error(`Ошибка при чтении папки ${layer}:`, err);
  }

  return folders;
};

// Создаем правила для всех слоев
const fsdLayerRules = [];

// Для каждого слоя FSD
fsdLayers.forEach(layer => {
  // Получаем папки (модули) в этом слое
  const moduleFolders = getFoldersInLayer(layer);

  // Для каждого модуля создаем правило
  moduleFolders.forEach(module => {
    fsdLayerRules.push({
      files: [`src/${layer}/${module}/**/*.{js,ts,jsx,tsx}`],
      rules: {
        'no-restricted-imports': ['error', {
          patterns: [{
            group: [`@/${layer}/${module}/**`, `${layer}/${module}/**`],
            message: `Используйте относительные пути импорта вместо алиасов внутри ${layer}/${module}.`
          }]
        }]
      }
    });
  });
});

export default [
  // Игнорируем папку сборки и сам конфиг
  {
    ignores: [
      '.next/**',
      'eslint.config.mjs',
      'node_modules/**',
      'public/**',
      '*.config.js',
      '*.config.mjs',
      'jsconfig.json'
    ],
  },

  // Динамические правила для всех слоёв FSD архитектуры
  ...fsdLayerRules,

  // Правило для запрета относительных импортов между слоями FSD
  {
    files: ['src/**/*.{js,ts,jsx,tsx}'],
    rules: {
      'no-restricted-imports': ['error', {
        patterns: [{
          group: ['../**/app/**', '../**/entities/**', '../**/features/**', '../**/widgets/**', '../**/pages/**', '../**/processes/**', '../**/shared/**'],
          message: 'Запрещены относительные импорты из других слоев FSD. Используйте абсолютные импорты с алиасами, например: import { Button } from "@/shared/ui"'
        }]
      }]
    }
  },

  // Общие правила для всех JS/TS файлов
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    plugins: {
      js,
      import: pluginImport,
      'unused-imports': pluginUnusedImports,
      'react-hooks': reactHooks,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      // Стандартные улучшения
      'no-console': 'off',
      'no-debugger': 'error',
      'unused-imports/no-unused-imports': 'warn',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
      eqeqeq: ['error', 'always'],
      curly: ['error', 'all'],
      'no-else-return': 'error',
      // Отступы - 2 пробела для всех файлов
      indent: ['error', 2, { SwitchCase: 1 }],
      // Двойные кавычки в строках
      quotes: ['error', 'double', { avoidEscape: true }],

      // import сортировка и проверки
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
        },
      ],
      'import/no-unresolved': 'error',
    },
  },

  // Правила TypeScript (type-aware)
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
        sourceType: 'module',
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      '@typescript-eslint/await-thenable': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'warn',
    },
  },

  // React и хуки, улучшения JSX
  {
    files: ['**/*.{js,jsx,tsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
    },
    rules: {
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-undef': 'error',
      'react/self-closing-comp': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'error',
      'react/prop-types': 'off',
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandFirst: true,
          noSortAlphabetically: false,
          reservedFirst: true,
        },
      ],
    },
    languageOptions: {
      globals: {
        __IS_DEV__: true,
        __API__: true,
      },
    },
    settings: {
      'import/resolver': {
        alias: {
          map: [
            ['@', './src'],
          ],
          extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
        },
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
      react: {
        version: 'detect',
      },
    },
  },

  js.configs.recommended,
];
