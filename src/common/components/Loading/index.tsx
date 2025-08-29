import {
	ActivityIndicator,
	type ColorValue,
	type TextProps,
	View,
	type ViewProps,
} from "react-native";
import { Text } from "@/common/components";
import style from "./styles";

type LoadingProps = {
	color?: ColorValue;
	indicatorSize?: number | "large" | "small";
	containerProps?: ViewProps;
	label: string | React.ReactNode;
	labelProps?: TextProps;
};

export const Loading = ({
	color = "#3a3a3a",
	indicatorSize = "large",
	containerProps,
	label = "Loading...",
	labelProps,
}: LoadingProps) => (
	<View {...containerProps} style={[style.container, containerProps?.style]}>
		<ActivityIndicator size={indicatorSize} color={color} />
		{typeof label === "string" ? (
			<Text {...labelProps} style={[style.label, { color }, labelProps?.style]}>
				{label}
			</Text>
		) : (
			label
		)}
	</View>
);
