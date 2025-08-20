import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	tabBarStyle: {
		borderTopWidth: 0,
		height: 55,
		position: "absolute",
		shadowColor: "none",
	},
	tabBarItemStyle: {
		height: 55,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.29,
		shadowRadius: 4.65,
		elevation: 7,
		borderWidth: 1,
		borderColor: "#E5E5EA",
	},
	sceneStyle: {
		backgroundColor: "#fff",
		paddingHorizontal: 20,
	},
	customContentStyle: {
		paddingVertical: 0,
	},
});

export default style;
