import { ReaderProvider } from "@epubjs-react-native/core";
import { createStaticNavigation } from "@react-navigation/native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { RootStack } from "./router";
import { colors } from "./theme";

const Navigation = createStaticNavigation(RootStack);

function App() {
	return (
		<SafeAreaProvider>
			<ReaderProvider>
				<SafeAreaView
					style={{ flex: 1, backgroundColor: colors.secondary }}
					edges={["top"]}
				>
					<Navigation />
				</SafeAreaView>
			</ReaderProvider>
		</SafeAreaProvider>
	);
}

// function AppContent() {
// 	const safeAreaInsets = useSafeAreaInsets();
// 	const [selectedFile, setSelectedFile] =
// 		useState<DocumentPickerResponse | null>(null);
// 	const {
// 		getMeta,
// 		currentLocation,
// 		goToLocation,
// 		getLocations,
// 		// theme,
// 		changeTheme,
// 	} = useReader();

// 	const [meta, setMeta] = useState<Meta | null>(null);
// 	useEffect(() => {
// 		if (currentLocation) {
// 			console.log("Current location:", currentLocation);
// 			const locationsString = getLocations().toString();
// 			if (locationsString && locationsString.trim() !== "") {
// 				try {
// 					const locations = JSON.parse(locationsString);
// 					console.log("All locations:", locations);
// 				} catch (error) {
// 					console.log("Failed to parse locations:", error);
// 				}
// 			}
// 		}
// 	}, [currentLocation]);
// 	return (
// 		<View style={styles.container}>
// 			<View
// 				style={[styles.statusBarBackground, { height: safeAreaInsets.top }]}
// 			>
// 				<StatusBar barStyle="light-content" translucent={false} />
// 			</View>
// 			<TouchableOpacity
// 				style={{ padding: 20, margin: 20, backgroundColor: colors.primary }}
// 				onPress={() => {
// 					pick({
// 						mode: "open",
// 						allowMultiSelection: false,
// 						// type: "*.epub",
// 					}).then((result) => {
// 						if (result) {
// 							console.log(result[0]);
// 							setSelectedFile(result[0]);
// 						}
// 					});
// 				}}
// 			>
// 				<Text>Add File</Text>
// 			</TouchableOpacity>
// 			<TouchableOpacity
// 				style={{ padding: 20, margin: 20, backgroundColor: colors.primary }}
// 				onPress={() => goToLocation("epubcfi(/6/270!/4/6/4/5:70)")}
// 			>
// 				<Text>Go to Location</Text>
// 			</TouchableOpacity>
// 			<Text>{meta?.title}</Text>
// 			{selectedFile && (
// 				<View style={{ flex: 1 }}>
// 					<Reader
// 						src={selectedFile.uri}
// 						fileSystem={useFileSystem}
// 						onReady={() => {
// 							const data = getMeta();
// 							setMeta(data as Meta);
// 						}}
// 						// defaultTheme={Themes.SEPIA}
// 						// onResized={(l) => console.log("Reader resized", l)}
// 						onSwipeRight={() => console.log("Swiped right")}
// 						onSwipeLeft={() => console.log("Swiped left")}
// 						// onChangeBookmarks={(bookmarks) =>
// 						// 	console.log("Bookmarks:", bookmarks)
// 						// }
// 						// onLocationChange={(location) => console.log("Location:", location)}
// 						// onChangeSection={(section) => console.log("Section:", section)}
// 						onDisplayError={(err) => console.log("Error:", err)}
// 					/>
// 				</View>
// 			)}
// 			<Text>{meta?.description}</Text>
// 		</View>
// 	);
// }

export default App;
