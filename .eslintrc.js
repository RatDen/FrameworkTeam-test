module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		project: './tsconfig.json',
	},
	settings: {
		react: {
			version: 'detect',
		},
		"import/resolver": {
			typescript: {
				project: "tsconfig.json",
			}
		}
	},
	extends: [
		'airbnb',
		'airbnb-typescript',
		'prettier'
	],
	rules: {
		'react/react-in-jsx-scope': 'off',
		"react/jsx-props-no-spreading": "off",
		'no-underscore-dangle': 'off'
	},
};
