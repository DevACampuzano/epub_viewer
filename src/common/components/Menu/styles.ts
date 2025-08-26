import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	btnWithoutFeedback: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		zIndex: 0,
	},
	menu: {
		minWidth: 150,
		overflow: "hidden",
		minHeight: 50,
		// maxHeight: 300,
		backgroundColor: "#f5f5f5",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#e0e0e0",
		position: "absolute",
		zIndex: 1000,
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	optionSubMenu: {
		paddingVertical: 12,
		paddingHorizontal: 16,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		gap: 5,
	},
	subMenuContainer: {
		backgroundColor: "#ededed98",
		marginLeft: 16,
		borderLeftWidth: 2,
		borderLeftColor: "#e0e0e0",
	},
});

export default styles;
