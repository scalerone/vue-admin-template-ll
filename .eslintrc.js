module.exports = {
	root: true,
	env: {
		node: true
	},
	extends: ['plugin:vue/recommended', '@vue/prettier'],
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'off' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'off' : 'off',
		'prettier/prettier': [
			// 'error',
			// 4,
			// {
			//   semi: false,
			//   singleQuote: true
			// },
			// {
			//   'baseIndent': 1
			// }
		]
	},
	parserOptions: {
		parser: 'babel-eslint'
	}
};
