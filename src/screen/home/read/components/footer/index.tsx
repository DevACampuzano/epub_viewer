import Slider from "@react-native-community/slider";
import type { FC } from "react";
import { Animated, View } from "react-native";
import DropShadow from "react-native-drop-shadow";
import { Text } from "@/components";
import { colors } from "@/theme";
import styles from "./styles";
import useFooter from "./useFooter";

interface IFooterProps {
	position: Animated.Value;
}

export const Footer: FC<IFooterProps> = ({ position }) => {
	const { debounced, section, currentPage, totalLocations, theme } =
		useFooter();
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
					style={[styles.container, { backgroundColor: theme.body.background }]}
				>
					<View style={styles.row}>
						<Text
							style={[
								styles.section,
								{
									color: theme.body.text,
								},
							]}
						>
							{section?.label.trim() || "N/A"}
						</Text>

						<Text>
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
