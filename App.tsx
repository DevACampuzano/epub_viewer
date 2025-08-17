import { StatusBar, StyleSheet, View } from "react-native";
import {
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

function App() {
	return (
		<SafeAreaProvider>
			<AppContent />
		</SafeAreaProvider>
	);
}

function AppContent() {
	const safeAreaInsets = useSafeAreaInsets();
	return (
		<View style={styles.container}>
			<View
				style={[styles.statusBarBackground, { height: safeAreaInsets.top }]}
			>
				<StatusBar barStyle="light-content" translucent={false} />
			</View>
		</View>
	);
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	statusBarBackground: {
		backgroundColor: "rgba(0, 139, 82, 1)",
	},
});

export default App;
