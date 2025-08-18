import { StyleSheet } from "react-native";

const style = StyleSheet.create({
	container: {
		width: "100%",
		gap: 5,
		marginTop: 5,
	},
	label: {
		fontWeight: "bold",
	},
	input: {
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
		width: "100%",
	},
    characterCount: {
        fontSize: 12,
        color: "#999",
        marginTop: 5,
        alignSelf: "flex-end",
    },
});

export default style;