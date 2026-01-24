module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:@typescript-eslint/recommended",
		"plugin:react-hooks/recommended",
		"prettier",
		"plugin:tailwindcss/recommended",
	],
	ignorePatterns: ["dist", ".eslintrc.cjs"],
	parser: "@typescript-eslint/parser",
	plugins: ["react-refresh", "tailwindcss"],
	rules: {
		"react-refresh/only-export-components": [
			"warn",
			{ allowConstantExport: true },
		],
		"@typescript-eslint/no-explicit-any": "off",
		// Allow custom classnames (for iconify, tests, etc.)
		"tailwindcss/no-custom-classname": "off",
		// Disable migration warnings (v2 to v3) - not critical
		"tailwindcss/migration-from-tailwind-2": "off",
	},
	overrides: [
		{
			// Disable react-refresh for test files and test utilities
			files: ["**/__tests__/**", "**/test/**", "**/*.test.*", "**/*.spec.*"],
			rules: {
				"react-refresh/only-export-components": "off",
			},
		},
		{
			// shadcn/ui components export both components and variants
			files: ["src/components/Header/ui/**"],
			rules: {
				"react-refresh/only-export-components": "off",
			},
		},
	],
}
