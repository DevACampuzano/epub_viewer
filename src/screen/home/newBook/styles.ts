import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	root: {
		paddingVertical: 10,
		gap: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 10,
	},
	subtitle: {
		fontSize: 16,
		marginBottom: 10,
	},
	detailContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "flex-start",
		backgroundColor: "#f5f5f5",
		padding: 10,
		borderRadius: 12,
		gap: 10,
		marginVertical: 10,
	},
	characteristics: {
		flexDirection: "row",
		gap: 10,
	},
	imageNotFound: {
		width: 200,
		height: 300,
		backgroundColor: "#d1d1d1ff",
		justifyContent: "center",
		alignItems: "center",
	},
	labelImage: {
		fontSize: 12,
		color: "#666",
		textAlign: "center",
	},
	btnImage: {
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		width: "100%",
	},
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

export default style;
