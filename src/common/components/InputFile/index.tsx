import Icon from "@react-native-vector-icons/lucide";
import {
	type TextProps,
	TouchableOpacity,
	type TouchableOpacityProps,
	View,
} from "react-native";
import { Text } from "../Text";
import styles from "./styles";

type _IInputFile = TouchableOpacityProps & {
	label: string;
	size?: number;
	textProps?: TextProps;
	iconProps?: React.ComponentProps<typeof Icon>;
	containerProps?: React.ComponentProps<typeof View>;
};

export const InputFile = ({
	label,
	textProps,
	iconProps,
	containerProps,
	size,
	...props
}: _IInputFile) => (
	<TouchableOpacity activeOpacity={0.7} {...props}>
		<View style={[styles.containerFile, containerProps?.style]}>
			<Icon
				size={30}
				color="#666"
				{...iconProps}
				name={iconProps?.name || "file-up"}
				style={[styles.icon, iconProps?.style]}
			/>
			<View style={styles.textContainer}>
				<Text {...textProps} style={styles.label}>
					{label}
				</Text>
				{size && <Text style={styles.size}>{size} MB</Text>}
			</View>
		</View>
	</TouchableOpacity>
);
