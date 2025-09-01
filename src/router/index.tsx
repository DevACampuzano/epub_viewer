import Icon from "@react-native-vector-icons/lucide";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Book, List, NewBook, Read, SearchBooks, Setting } from "@screens/";
import { Platform, useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "@/common/theme";
import style from "./styles";

const RootTabs = createBottomTabNavigator<_IRootTabs>();

const RootTabsNavigation = () => {
	const { bottom } = useSafeAreaInsets();
	const { width, height } = useWindowDimensions();
	const isPortrait = height > width;

	return (
		<RootTabs.Navigator
			initialRouteName="list"
			screenOptions={({ navigation, route }) => ({
				headerShown: false,
				sceneStyle: style.sceneStyle,
				tabBarActiveTintColor: colors.primary,
				tabBarItemStyle: [
					style.tabBarItemStyle,
					{
						backgroundColor:
							route.name ===
							navigation.getState().routeNames[navigation.getState().index]
								? colors.secondary
								: "#fff",
						zIndex:
							route.name !==
							navigation.getState().routeNames[navigation.getState().index]
								? 1
								: 0,
						...(Platform.OS === "ios"
							? {
									borderStartStartRadius: route.name === "list" ? 16 : 0,
									borderEndStartRadius: route.name === "list" ? 16 : 0,
									borderEndEndRadius: route.name === "settings" ? 16 : 0,
									borderStartEndRadius: route.name === "settings" ? 16 : 0,
								}
							: {
									borderStartStartRadius: route.name === "list" ? 16 : 0,
									borderEndStartRadius: route.name === "settings" ? 16 : 0,
									borderEndEndRadius: route.name === "settings" ? 16 : 0,
									borderStartEndRadius: route.name === "list" ? 16 : 0,
								}),
					},
				],
				tabBarStyle: [
					style.tabBarStyle,
					{
						bottom: bottom || 20,
						marginHorizontal: isPortrait ? width * 0.05 : width * 0.25,
					},
				],
			})}
		>
			<RootTabs.Screen
				name="list"
				component={
					// biome-ignore lint/suspicious/noExplicitAny: It is a stack view type but it has to be rendered as an initial view in a button bar.
					List as any
				}
				options={{
					sceneStyle: {
						paddingHorizontal: 0,
					},
					tabBarLabel: "Biblioteca",
					tabBarIcon: ({ color, size }) => (
						<Icon name="book" color={color} size={size} />
					),
				}}
			/>
			<RootTabs.Screen
				name="settings"
				component={Setting}
				options={{
					tabBarLabel: "Configuraciones",
					tabBarIcon: ({ color, size }) => (
						<Icon name="settings" color={color} size={size} />
					),
				}}
			/>
		</RootTabs.Navigator>
	);
};

const RootStackNav = createNativeStackNavigator<_IRootStack>();

export const RootStack = () => {
	return (
		<RootStackNav.Navigator
			initialRouteName="home"
			screenOptions={{
				headerShown: false,
				contentStyle: style.sceneStyle,
			}}
		>
			<RootStackNav.Screen
				name="home"
				component={RootTabsNavigation}
				options={{
					contentStyle: style.customContentStyle,
				}}
			/>

			<RootStackNav.Screen name="book" component={Book} />
			<RootStackNav.Screen
				name="read"
				component={Read}
				options={{
					contentStyle: style.customContentStyle,
				}}
			/>
			<RootStackNav.Screen name="newBook" component={NewBook} />
			<RootStackNav.Screen name="searchBooks" component={SearchBooks} />
		</RootStackNav.Navigator>
	);
};
