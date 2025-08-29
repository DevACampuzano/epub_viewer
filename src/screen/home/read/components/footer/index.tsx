import Slider from "@react-native-community/slider";
import type { FC } from "react";
import { Animated, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { Text } from "@/common/components";
import { colors } from "@/common/theme";
import styles from "./styles";
import useFooter from "./useFooter";

type IFooterProps = {
	position: Animated.Value;
	currentTheme: ITheme;
};

export const Footer: FC<IFooterProps> = ({ position, currentTheme }) => {
	const { debounced, section, currentPage, totalLocations } = useFooter();
	const color = currentTheme.value.p.color.split(" ")[0];

	return (
		<Animated.View
			style={[
				styles.containerAnimate,
				{
					transform: [{ translateY: position }],
				},
			]}
		>
			<DropShadow style={styles.boxShadow}>
				<View
					style={[
						styles.container,
						{ backgroundColor: currentTheme.value.body.background },
					]}
				>
					<View style={styles.row}>
						<Text
							style={[
								styles.section,
								{
									color,
								},
							]}
						>
							{section?.label.trim() || "N/A"}
						</Text>

						<Text style={{ color }}>
							{currentPage + 1}/{totalLocations + 1}
						</Text>
					</View>
					<Slider
						style={styles.slider}
						disabled={totalLocations === 0}
						minimumValue={0}
						maximumValue={totalLocations}
						value={currentPage}
						thumbTintColor={colors.primary}
						minimumTrackTintColor={colors.primary}
						maximumTrackTintColor={colors.success}
						step={1}
						tapToSeek
						onValueChange={(page) => debounced(page)}
					/>
				</View>
			</DropShadow>
		</Animated.View>
	);
};
