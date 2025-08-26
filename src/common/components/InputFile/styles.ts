import { StyleSheet } from "react-native";

export default StyleSheet.create({
	containerFile: {
		backgroundColor: "#f5f5f5",
		boxSizing: "border-box",
		borderRadius: 12,
		padding: 20,
		flexDirection: "row",
		justifyContent: "flex-start",
		alignItems: "center",
		gap: 10,
	},
	icon: {
		backgroundColor: "#fff",
		padding: 10,
		borderRadius: 50,
		flexShrink: 0,
	},
	textContainer: {
		flex: 1,
		flexShrink: 1,
		minWidth: 0,
	},
	label: {
		overflow: "hidden",
	},
	size: {
		fontSize: 12,
		color: "#666",
	},
});
