import Icon from "@react-native-vector-icons/lucide";
import type { FC } from "react";
import {
	type TextProps,
	TouchableOpacity,
	type TouchableOpacityProps,
} from "react-native";
import { colors } from "@/common/theme";
import { Text } from "../Text";
import styles from "./styles";

type _IButton = TouchableOpacityProps & {
	label: string;
	labelProps?: TextProps;
};

export const ButtonBack: FC<_IButton> = ({ label, labelProps, ...props }) => (
	<TouchableOpacity
		activeOpacity={0.7}
		{...props}
		style={[styles.btn, props.style]}
	>
		<Icon name="chevron-left" size={20} color={colors.primary} />
		<Text {...labelProps} style={[styles.label, labelProps?.style]}>
			{label}
		</Text>
	</TouchableOpacity>
);
