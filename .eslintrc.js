module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended'
	],
	'overrides': [
	],
	'parser': '@typescript-eslint/parser',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'plugins': [
		'@typescript-eslint'
	],
	'rules': {
		'no-unused-vars': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/ban-types': 'off',
		'indent': 'off',
		'@typescript-eslint/indent': ["error"],
		// 'linebreak-style': [
		// 	'error',
		// 	'unix'
		// ],
		// 'quotes': [
		// 	'error',
		// 	'single'
		// ],
		'semi': [
			'error',
			'always'
		]
	}
};
