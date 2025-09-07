import js from '@eslint/js'
import prettierConfig from 'eslint-config-prettier/flat'
import importPlugin from 'eslint-plugin-import'
import prettierPlugin from 'eslint-plugin-prettier'
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'
import reactPlugin from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import { defineConfig } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
	js.configs.recommended,
	tseslint.configs.strictTypeChecked,
	tseslint.configs.stylisticTypeChecked,
	eslintPluginPrettierRecommended,
	importPlugin.flatConfigs.recommended,
	{
		files: ['**/*.{js,jsx,mjs,mts,cjs,ts,tsx}'],
		languageOptions: {
			globals: {
				...globals.browser,
			},
			parser: tseslint.parser,
			parserOptions: {
				project: './tsconfig.json',
			},
		},
		settings: {
			'import/resolver': {
				typescript: {
					project: './tsconfig.json',
				},
			},
		},
		plugins: {
			'react-hooks': reactHooks,
			prettier: prettierPlugin,
			react: reactPlugin,
			importPlugin,
		},
		rules: {
			...reactHooks.configs.recommended.rules,
			...prettierConfig.rules,
			'importPlugin/order': [
				'error',
				{
					groups: [
						'builtin',
						'external',
						'internal',
						'parent',
						'sibling',
						'index',
					],
					'newlines-between': 'always',
				},
			],
			'react-hooks/rules-of-hooks': 'error',
			'react-hooks/exhaustive-deps': 'warn',
			'no-multiple-empty-lines': 'warn',
			'prettier/prettier': 'warn',
			'no-var': 'warn',
			'prefer-const': 'error',
			'no-console': 'error',
		},
	},
	{
		ignores: ['dist', 'node_modules', '.husky', '.idea', '.vscode'],
	},
])
