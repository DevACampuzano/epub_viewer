import Icon, { type LucideIconName } from "@react-native-vector-icons/lucide";
import type { ComponentProps, FC, PropsWithChildren } from "react";
import { type TextProps, View, type ViewProps } from "react-native";
import { Text } from "@/common/components";
import { colors } from "@/common/theme";
import style from "./styles";

interface SectionProps {
	title: string;
	description: string;
	icon?: LucideIconName;
	containerProps?: ViewProps;
	descriptionProps?: TextProps;
	titleProps?: TextProps;
	iconProps?: ComponentProps<typeof Icon>;
}

export const Section: FC<SectionProps & PropsWithChildren> = ({
	title,
	description,
	icon,
	children,
	containerProps,
	descriptionProps,
	iconProps,
	titleProps,
}) => {
	return (
		<View {...containerProps} style={[style.section, containerProps?.style]}>
			<View style={style.headerRow}>
				{icon && (
					<Icon
						{...iconProps}
						name={icon}
						size={iconProps?.size || 25}
						color={iconProps?.color || colors.primary}
					/>
				)}
				<Text {...titleProps} style={[style.titleSection, titleProps?.style]}>
					{title}
				</Text>
			</View>
			<Text {...descriptionProps}>{description}</Text>
			{children}
		</View>
	);
};
