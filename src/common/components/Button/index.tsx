import type { FC } from "react";
import {
	type TextProps,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";
import { Text } from "../Text";
import styles from "./styles";

type _IButton = TouchableOpacityProps & {
	label: string | React.ReactNode;
	labelProps?: TextProps;
	variant?: "outline" | "filled";
};

export const Button: FC<_IButton> = ({
	style,
	variant,
	labelProps,
	label,
	...props
}) => (
	<TouchableOpacity
		activeOpacity={0.7}
		{...props}
		style={[
			variant === "outline" ? styles.buttonOutline : styles.button,
			props.disabled && styles.buttonDisabled,
			style,
		]}
	>
		{typeof label === "string" ? (
			<Text
				{...labelProps}
				style={[
					variant === "outline" ? styles.textOutline : styles.text,
					labelProps?.style,
				]}
			>
				{label}
			</Text>
		) : (
			label
		)}
	</TouchableOpacity>
);
