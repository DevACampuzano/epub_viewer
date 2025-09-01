import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	section: {
		backgroundColor: "#f5f5f5",
		position: "static",
		padding: 20,
		borderRadius: 25,
		gap: 10,
		margin: 8,
		marginVertical: 10,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,

		elevation: 8,
	},
	titleSection: {
		fontWeight: "bold",
		fontSize: 18,
	},
	headerRow: { flexDirection: "row", alignItems: "center", gap: 10 },
});

export default style;
