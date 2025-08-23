import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingTop: 10,
		justifyContent: "center",
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
		height: 55,
		borderTopColor: "#ddddddff",
		borderTopWidth: 1,
	},
	row: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	section: {
		fontSize: 18,
		fontWeight: "bold",
	},
	slider: { height: 20, width: "100%" },
});

export default styles;
