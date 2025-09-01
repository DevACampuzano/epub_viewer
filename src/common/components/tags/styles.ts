import { StyleSheet } from "react-native";
import { colors } from "@/common/theme";

const style = StyleSheet.create({
    root: {
        padding: 5,
        borderRadius: 5,
        gap: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: colors.secondary,
    },
});

export default style;
