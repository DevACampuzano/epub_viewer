import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		left: 20,
		right: 20,
		position: "absolute",
		padding: 10,
		borderRadius: 5,
		backgroundColor: "#F8F9FA",
		shadowColor: "#000",
		shadowOffset: { width: 4, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 10,
	},
	textContainer: {
		flexDirection: "row",
		gap: 10,
		alignItems: "center",
		justifyContent: "center",
		boxSizing: "border-box",
		padding: 10,
	},
});

export default styles;
