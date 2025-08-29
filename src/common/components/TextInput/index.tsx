import type { FC } from "react";
import {
	TextInput as RNTextInput,
	type TextInputProps,
	type TextProps,
	View,
	type ViewProps,
} from "react-native";
import { Text } from "../Text";
import style from "./styles";

type _ITextInputProps = TextInputProps & {
	label?: string;
	containerProps?: ViewProps;
	labelProps?: TextProps;
};

export const TextInput: FC<_ITextInputProps> = ({
	label,
	labelProps,
	containerProps,
	...props
}) => (
	<View {...containerProps} style={[style.container, containerProps?.style]}>
		{label && (
			<Text {...labelProps} style={[style.label, labelProps?.style]}>
				{label}
			</Text>
		)}
		<RNTextInput {...props} style={[style.input, props.style]} />
		{props.maxLength && (
			<Text style={style.characterCount}>
				{props.value?.length || 0} / {props.maxLength}
			</Text>
		)}
	</View>
);
