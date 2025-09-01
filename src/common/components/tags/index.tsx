import Icon from "@react-native-vector-icons/lucide";
import {
	Text,
	type TextProps,
	TouchableOpacity,
	View,
	type ViewProps,
} from "react-native";
import { colors } from "@/common/theme";
import style from "./styles";

type TagsProps = {
	label: string;
	containerProps?: ViewProps;
	labelProps?: TextProps;
	onPress?: () => void;
};

export const Tags: React.FC<TagsProps> = ({
	label,
	containerProps,
	labelProps,
	onPress,
}) => {
	return (
		<View {...containerProps} style={[style.root, containerProps?.style]}>
			<Text {...labelProps}>{label}</Text>
			{onPress && (
				<TouchableOpacity onPress={onPress} activeOpacity={0.7}>
					<Icon name="trash" size={20} color={colors.primary} />
				</TouchableOpacity>
			)}
		</View>
	);
};
