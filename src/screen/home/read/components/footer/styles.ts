import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	containerAnimate: {
		position: "absolute",
		left: 0,
		right: 0,
		bottom: 0,
	},
	boxShadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: -5,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	container: {
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderTopColor: "#ddddddff",
		borderTopWidth: 1,
		height: 55,
		justifyContent: "center",
	},
	row: {
		justifyContent: "space-between",
		alignItems: "center",
		flexDirection: "row",
	},
	section: {
		fontSize: 18,
		fontWeight: "bold",
	},
	slider: { height: 20, width: "100%" },
});

export default styles;
