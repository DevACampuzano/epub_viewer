import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	root: {
		flex: 1,
		paddingVertical: 10,
		gap: 10,
	},
	header: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontWeight: "bold",
		fontSize: 25,
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
