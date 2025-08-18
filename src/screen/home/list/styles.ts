import { StyleSheet } from "react-native";

const style = StyleSheet.create({
        root: { flex: 1, paddingVertical: 10, gap: 10 },
        header: {
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-between",
            alignItems: "center",
        },
        title: {
            fontWeight: "bold",
            fontSize: 25,
        },
    });

    export default style