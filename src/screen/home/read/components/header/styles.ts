import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	root: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		zIndex: 10,
	},
	boxShadow: {
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 10,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
	},
	container: {
		paddingHorizontal: 20,
		height: 55,
		borderBottomColor: "#ddddddff",
		borderBottomWidth: 1,

		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		position: "static",
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
	menuContainer: {
		width: "100%",
		height: "100%",
		position: "absolute",
		top: 0,
		left: 0,
		zIndex: 20,
		backgroundColor: "#0000001c",
	},
	menu: {
		minWidth: 150,
		minHeight: 50,
		borderBottomColor: "#ddddddff",
		borderBottomWidth: 1,
		padding: 10,
		paddingHorizontal: 20,
		position: "absolute",
		top: 10,
		right: 10,
		zIndex: 21,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		borderRadius: 10,

		elevation: 5,
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
	},
	titleMenu: {
		fontSize: 18,
		fontWeight: "bold",
	},
	drawer: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: "#5555557a",
		zIndex: 20,
		flexDirection: "row",
	},
	drawerContainer: {
		position: "absolute",
		top: 0,
		bottom: 0,
		left: 0,
		width: "70%",
		zIndex: 21,
		padding: 20,
	},
	drawerHeader: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		justifyContent: "space-between",
	},
	drawerOptionView: {
		alignItems: "center",
		gap: 5,
		flexDirection: "row",
		padding: 10,
		borderRadius: 5,
	},
	drawerOptionTitle: {
		fontSize: 18,
		fontWeight: "bold",
	},
});

export default style;
