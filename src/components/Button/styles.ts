import { StyleSheet } from "react-native";
import { colors } from "@/theme";

export default StyleSheet.create({
	button: {
		padding: 10,
		backgroundColor: colors.primary,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
	},
	buttonOutline: {
		padding: 10,
		borderColor: colors.success,
		borderWidth: 1,
		borderRadius: 8,
		justifyContent: "center",
		alignItems: "center",
		flexDirection: "row",
		gap: 10,
	},
	textOutline: {
		color: colors.primary,
	},
	text: {
		color: "#fff",
	},
});
