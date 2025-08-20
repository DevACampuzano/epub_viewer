import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	root: {
		paddingVertical: 20,
		gap: 10,
	},
	progressContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	progressText: {
		fontWeight: "bold",
		color: "black",
	},
	progressPercentage: {
		color: "black",
	},
	ratingContainer: {
		flexDirection: "row",
		gap: 10,
	},
	imageNotFound: {
		width: 300,
		height: 400,
		backgroundColor: "#d1d1d1ff",
		justifyContent: "center",
		alignItems: "center",
		alignSelf: "center",
	},
	section: {
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: "#f5f5f5",
		padding: 20,
		borderRadius: 25,
		gap: 10,
		margin: 8,
		marginVertical: 10,

		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 4,
		},
		shadowOpacity: 0.3,
		shadowRadius: 4.65,

		elevation: 8,
	},
	rowDetails: {
		flexDirection: "row",
		justifyContent: "space-between",
		width: "100%",
	},
	labelButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 5,
	},
});

export default style;
