import { ReaderProvider } from "@epubjs-react-native/core";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "./router";
import { useBookStore, useSettingStore } from "./stores";

function App() {
	useBookStore.persist.rehydrate();
	useSettingStore.persist.rehydrate();
	return (
		<SafeAreaProvider>
			<ReaderProvider>
				<ContentApp />
			</ReaderProvider>
		</SafeAreaProvider>
	);
}

const ContentApp = () => {
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
			<NavigationContainer>
				<RootStack />
			</NavigationContainer>
		</SafeAreaView>
	);
};

export default App;
