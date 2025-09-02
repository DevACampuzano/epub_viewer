import { StyleSheet } from "react-native";
import { colors } from "@/common/theme";

const style = StyleSheet.create({
	root: {
		paddingVertical: 10,
		paddingHorizontal: 20,
		gap: 10,
	},
	header: {
		width: "100%",
		gap: 10,
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	title: {
		fontWeight: "bold",
		fontSize: 25,
		color: "white",
	},
	containerEmpty: {
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	textEmpty: {
		fontSize: 20,
		color: "#888",
		fontWeight: "bold",
	},
	progressContainer: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	progressText: {
		fontWeight: "bold",
	},
	figure: {
		height: 330,
		backgroundColor: colors.tertiary,
		left: 0,
		right: 0,
		zIndex: -1,
		position: "absolute",
		borderEndEndRadius: 50,
		borderEndStartRadius: 50,
		borderBottomLeftRadius: 50,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},
});

export default style;
