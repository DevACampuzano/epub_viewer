import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	root: {
		paddingVertical: 20,
		gap: 10,
	},
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
	section: {
		backgroundColor: "#f5f5f5",

		padding: 20,
		borderRadius: 25,
		gap: 10,
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
});

export default style;
