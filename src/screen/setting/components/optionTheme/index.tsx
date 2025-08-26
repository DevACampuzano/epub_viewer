import type { FC } from "react";
import {
	type TextProps,
	TouchableOpacity,
	type TouchableOpacityProps,
	View,
	type ViewProps,
} from "react-native";
import { Text } from "@/common/components";
import style from "./styles";

type _IButton = TouchableOpacityProps & {
	label: string;
	labelProps?: TextProps;
	description: string;
	descriptionProps?: TextProps;
	active?: boolean;
	activeStyle?: {
		button: TouchableOpacityProps["style"];
		radio: ViewProps["style"];
		radioActive: ViewProps["style"];
	};
};

export const OptionTheme: FC<_IButton> = ({
	label,
	labelProps,
	description,
	descriptionProps,
	active,
	activeStyle,
	...props
}) => (
	<TouchableOpacity
		activeOpacity={0.7}
		{...props}
		style={[
			style.button,
			props.style,
			...(active
				? [style.buttonActive, (activeStyle?.button as object) || {}]
				: []),
		]}
	>
		<View style={{ gap: 5 }}>
			<Text {...labelProps} style={[style.label, labelProps?.style]}>
				{label}
			</Text>
			<Text
				{...descriptionProps}
				style={[style.description, descriptionProps?.style]}
			>
				{description}
			</Text>
		</View>
		{active ? (
			<View
				style={[style.radioActive, (activeStyle?.radioActive as object) || {}]}
			/>
		) : (
			<View style={[style.radio, (activeStyle?.radio as object) || {}]} />
		)}
	</TouchableOpacity>
);
