import type { FC } from "react";
import {
	type TextProps,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";
import { Text } from "../Text";
import styles from "./styles";

type _IButton = TouchableOpacityProps & {
	label: string;
	labelProps?: TextProps;
};

export const Button: FC<_IButton> = (props) => (
	<TouchableOpacity
		activeOpacity={0.7}
		{...props}
		style={[styles.button, props.style]}
	>
		<Text {...props.labelProps} style={[styles.text, props.labelProps?.style]}>
			{props.label}
		</Text>
	</TouchableOpacity>
);
