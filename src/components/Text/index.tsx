import type { FC } from "react";
import { Text as RNText, StyleSheet, type TextProps } from "react-native";

export const Text: FC<TextProps> = (props) => (
	<RNText style={[style.text, props.style]} {...props} />
);

const style = StyleSheet.create({
	text: {
		color: "#3a3a3a",
		fontFamily: "GeistSans",
	},
});
