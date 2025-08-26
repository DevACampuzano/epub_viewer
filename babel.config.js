module.exports = {
	presets: ["module:@react-native/babel-preset"],
	plugins: [
		[
			"module-resolver",
			{
				root: ["./src"],
				alias: {
					"@": "./src",
					"@screens": "./src/screen",
				},
			},
		],
		"react-native-worklets/plugin",
	],
};
