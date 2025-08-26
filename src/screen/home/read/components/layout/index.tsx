import type { FC, PropsWithChildren } from "react";
import { Platform, StyleSheet, View } from "react-native";
import {
	Gesture,
	GestureDetector,
	GestureHandlerRootView,
	type TapGesture,
	TouchableNativeFeedback,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useSettingStore } from "@/common/stores";

type ILayoutProps = PropsWithChildren & {
	singleTap: TapGesture | (() => void);
};
export const Layout: FC<ILayoutProps> = ({ children, singleTap }) => {
	const { bottom } = useSafeAreaInsets();
	const currentTheme = useSettingStore((state) => state.currentTheme);
	if (Platform.OS === "ios") {
		return (
			<TouchableNativeFeedback
				style={[
					style.root,
					style.container,
					{
						paddingBottom: bottom || 30,
						backgroundColor: currentTheme.value.body.background,
					},
				]}
				onPress={singleTap as () => void}
				onPressIn={() => {}}
				onLongPress={() => {}}
				delayLongPress={400}
			>
				<View style={style.container}>{children}</View>
			</TouchableNativeFeedback>
		);
	}
	return (
		<GestureHandlerRootView
			style={[
				style.root,
				{
					paddingBottom: bottom || 30,
					backgroundColor: currentTheme.value.body.background,
				},
			]}
		>
			<GestureDetector gesture={Gesture.Exclusive(singleTap as TapGesture)}>
				<View style={style.container} collapsable={false}>
					{children}
				</View>
			</GestureDetector>
		</GestureHandlerRootView>
	);
};

const style = StyleSheet.create({
	root: { flex: 1, paddingVertical: 20 },
	container: {
		flex: 1,
		// position: "relative",
	},
});
