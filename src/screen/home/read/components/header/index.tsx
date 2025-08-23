import Icon from "@react-native-vector-icons/lucide";
import type { FC } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "@/components";

type IHeaderProps = {
	currentTheme: ITheme;
	title: string;
	onClose: () => void;
	opacity: Animated.Value;
};

export const Header: FC<IHeaderProps> = ({
	currentTheme,
	title,
	onClose,
	opacity,
}) => {
	return (
		<Animated.View
			style={[
				style.root,
				{
					backgroundColor: currentTheme.value.body.background,
					opacity,
				},
			]}
		>
			<TouchableOpacity style={style.backButton} onPress={onClose}>
				<Icon
					name="chevron-left"
					size={30}
					color={currentTheme.value.p.color.split(" ")[0]}
				/>
				<Text
					style={{
						color: currentTheme.value.p.color.split(" ")[0],
						fontSize: 18,
						fontWeight: "bold",
					}}
				>
					{title}
				</Text>
			</TouchableOpacity>
		</Animated.View>
	);
};

const style = StyleSheet.create({
	root: {
		paddingHorizontal: 20,
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		height: 55,
		borderBottomColor: "#ddddddff",
		borderBottomWidth: 1,
		zIndex: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	backButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
	},
});
