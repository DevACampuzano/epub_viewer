import type { FC, PropsWithChildren } from "react";
import { StatusBar, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSettingStore } from "@/common/stores";

export const Layout: FC<PropsWithChildren> = ({ children }) => {
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
			<View style={{ flex: 1, backgroundColor: "#fff", paddingHorizontal: 20 }}>
				{children}
			</View>
		</SafeAreaView>
	);
};
