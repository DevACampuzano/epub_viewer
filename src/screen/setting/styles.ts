import { StyleSheet } from "react-native";
import { colors } from "@/theme";

const style = StyleSheet.create({
	root: {
		paddingVertical: 20,
		gap: 10,
	},
	headerRow: { flexDirection: "row", alignItems: "center", gap: 10 },
	icon: {
		padding: 10,
		backgroundColor: colors.secondary,
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
		padding: 20,
		borderRadius: 5,
		borderWidth: 1,
		borderColor: "#ccc",
	},
});

export const colorPickerStyle = StyleSheet.create({
	picker: {
		gap: 20,
	},

	panelStyle: {
		borderRadius: 16,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	sliderStyle: {
		borderRadius: 20,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	inputStyle: {
		color: "#707070",
		paddingVertical: 2,
		borderColor: "#707070",
		fontSize: 12,
		marginLeft: 5,
	},
});

export default style;
