import type { FC } from "react";
import { StatusBar, type StyleProp, View, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingStore } from "@/common/stores";

interface ILayoutProps {
	children: React.ReactNode;
	style?: StyleProp<ViewStyle>;
}

export const Layout: FC<ILayoutProps> = ({ children, style }) => {
	const currentTheme = useSettingStore((state) => state.currentTheme);
	return (
		<SafeAreaView
			style={{
				flex: 1,
				backgroundColor: currentTheme.value.body.background,
			}}
			edges={["top"]}
		>
			<StatusBar
				barStyle={
					currentTheme.label === "Oscuro" ? "light-content" : "dark-content"
				}
			/>
			<View
				style={[
					{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 },
					style,
				]}
			>
				{children}
			</View>
		</SafeAreaView>
	);
};
