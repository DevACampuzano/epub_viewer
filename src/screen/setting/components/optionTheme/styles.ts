import { StyleSheet } from "react-native";
import { colors } from "@/common/theme";

const style = StyleSheet.create({
	button: {
		marginTop: 10,
		padding: 10,
		borderRadius: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		borderColor: "#cdcece",
		borderWidth: 1,
	},
	buttonActive: {
		borderColor: colors.primary,
		borderWidth: 2,
		backgroundColor: colors.secondary,
	},
	label: { fontWeight: "bold", fontSize: 16 },
	description: { fontSize: 14 },
	radio: {
		borderWidth: 1,
		padding: 10,
		borderRadius: 50,
		borderColor: "#cdcece",
	},
	radioActive: {
		borderWidth: 5,
		padding: 7,
		borderRadius: 50,
		borderColor: colors.primary,
	},
});

export default style;
