module.exports = {
	presets: ["module:@react-native/babel-preset"],
	plugins: [
		[
			"module-resolver",
			{
				root: ["./src"],
				alias: {
					"@": "./src",
					"@components": "./src/components",
					"@screens": "./src/screen",
					"@router": "./src/router",
					"@types": "./src/types",
					"@hooks": "./src/hooks",
					"@theme": "./src/theme",
				},
			},
		],
	],
};
