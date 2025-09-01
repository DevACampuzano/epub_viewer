import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	root: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		gap: 10,
	},
	header: {
		width: "100%",
		gap: 10,
		paddingHorizontal: 20,
		minHeight: 240
	},
	title: {
		fontWeight: "bold",
		fontSize: 25,
		color: "white",
	},
	containerEmpty: {
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	textEmpty: {
		fontSize: 20,
		color: "#888",
		fontWeight: "bold",
	},
	progressContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	progressText: {
		fontWeight: "bold",
	},
});

export default style;
