import * as RNFS from "@dr.pogodin/react-native-fs";
import { ReaderProvider } from "@epubjs-react-native/core";
import { NavigationContainer } from "@react-navigation/native";
import { RealmProvider } from "@realm/react";
import { SafeAreaProvider } from "react-native-safe-area-context";
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
				schemaVersion={6}
			>
				<ReaderProvider>
					<NavigationContainer>
						<RootStack />
					</NavigationContainer>
				</ReaderProvider>
			</RealmProvider>
		</SafeAreaProvider>
	);
}

export default App;
