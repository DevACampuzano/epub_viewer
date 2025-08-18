const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path");

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
	resolver: {
		alias: {
			"@": path.resolve(__dirname, "src"),
			"@components": path.resolve(__dirname, "src/components"),
			"@screens": path.resolve(__dirname, "src/screen"),
			"@router": path.resolve(__dirname, "src/router"),
			"@types": path.resolve(__dirname, "src/types"),
			"@theme": path.resolve(__dirname, "src/theme"),
		},
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
