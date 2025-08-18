import { StyleSheet } from "react-native";
import { colors } from "@/theme";

const styles = StyleSheet.create({
	progressBarContainer: {
		width: "100%",
		height: 5,
		backgroundColor: colors.secondary,
		borderRadius: 10,
	},
	progressBar: {
		height: "100%",
		width: "50%",
		borderRadius: 10,
		backgroundColor: colors.primary,
	},
});

export default styles;