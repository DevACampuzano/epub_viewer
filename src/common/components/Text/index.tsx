import type { FC } from "react";
import { Text as RNText, type TextProps } from "react-native";
import styles from "./styles";

export const Text: FC<TextProps> = (props) => (
	<RNText
		{...props}
		style={[styles.text, props.style]}
		allowFontScaling={false}
	/>
);
