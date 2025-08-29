import * as RNFS from "@dr.pogodin/react-native-fs";
import { ReaderProvider } from "@epubjs-react-native/core";
import { NavigationContainer } from "@react-navigation/native";
import { RealmProvider } from "@realm/react";
import { StatusBar } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Book } from "./common/schemas";
import { useSettingStore } from "./common/stores";
import { RootStack } from "./router";

function App() {
	useSettingStore.persist.rehydrate();
	return (
		<SafeAreaProvider>
			<RealmProvider
				schema={[Book]}
				path={`${RNFS.DocumentDirectoryPath}/realm/db.realm`}
				schemaVersion={4}
			>
				<ReaderProvider>
					<ContentApp />
				</ReaderProvider>
			</RealmProvider>
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
