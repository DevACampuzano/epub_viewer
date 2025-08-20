import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	card: {
		height: 370,
		width: 170,
		backgroundColor: "#f5f5f5",
		boxSizing: "border-box",
		borderRadius: 12,
		position: "relative",
	},
	imageBackground: {
		flex: 1,
		justifyContent: "flex-end",
		padding: 10,
		gap: 5,
		borderTopStartRadius: 12,
		borderTopEndRadius: 12,
		overflow: "hidden",
	},
	progressContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	progressText: {
		fontWeight: "bold",
		color: "white",
	},
	progressPercentage: {
		color: "white",
	},
	cardContent: {
		padding: 10,
	},
	cardTitle: {
		fontWeight: "bold",
		fontSize: 18,
	},
	cardAuthor: {
		color: "#666",
	},
	ratingContainer: {
		flexDirection: "row",
		gap: 10,
		marginTop: 10,
	},
});

export default style;
