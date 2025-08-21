import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	root: {
		paddingVertical: 20,
		gap: 10,
	},
	headerRow: { flexDirection: "row", alignItems: "center", gap: 10 },
	icon: {
		padding: 10,
		backgroundColor: "#d0fae5",
		borderRadius: 5,
	},
	title: {
		fontWeight: "bold",
		fontSize: 25,
	},
	subtitle: {
		fontWeight: "normal",
		fontSize: 16,
		color: "#666",
	},
	imageTheme: {
		height: 270,
		borderRadius: 10,
		marginTop: 10,
		alignSelf: "center",
		justifyContent: "center",
		alignItems: "center",
		gap: 10,
	},
	titleExample: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 20,
	},
	textExample: {
		textAlign: "center",
		fontWeight: "normal",
		fontSize: 16,
	},
	textExampleHighlighted: {
		width: "100%",
		padding: 5,
		borderRadius: 5,
	},
});

export default style;
