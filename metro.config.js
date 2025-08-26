const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("node:path");

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
			"@screens": path.resolve(__dirname, "src/screen"),
		},
	},
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
