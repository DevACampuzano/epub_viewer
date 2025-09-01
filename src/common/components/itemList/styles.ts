import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	root: {
		backgroundColor: "#f5f5f5",
		borderRadius: 12,
		position: "relative",
		width: "100%",
		overflow: "hidden",
		flexDirection: "row",

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	containerInfo: {
		flex: 1,
		padding: 10,
		gap: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	image: {
		aspectRatio: 9 / 16,
		maxWidth: "100%",
		overflow: "hidden",
	},
	title: {
		fontWeight: "bold",
		fontSize: 18,
		flexWrap: "wrap",
	},
	author: {
		color: "#666",
	},
	progressContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	progressText: {
		fontWeight: "bold",
	},
	ratingContainer: {
		flexDirection: "row",
		gap: 10,
		marginTop: 10,
	},
});

export default styles;
