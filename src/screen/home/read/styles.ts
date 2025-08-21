import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	root: { flex: 1, paddingVertical: 20 },
	backButton: {
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 10,
	},
	refreshButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
		zIndex: 10,
	},
});

export default style;
