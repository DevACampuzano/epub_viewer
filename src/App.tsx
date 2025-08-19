import { ReaderProvider } from "@epubjs-react-native/core";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "./router";
import { useBookStore } from "./stores";
import { colors } from "./theme";

function App() {
	useBookStore.persist.rehydrate();
	return (
		<SafeAreaProvider>
			<ReaderProvider>
				<SafeAreaView
					style={{ flex: 1, backgroundColor: colors.secondary }}
					edges={["top"]}
				>
					<NavigationContainer>
						<RootStack />
					</NavigationContainer>
				</SafeAreaView>
			</ReaderProvider>
		</SafeAreaProvider>
	);
}

export default App;
