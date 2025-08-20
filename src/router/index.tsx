/** biome-ignore-all lint/suspicious/noExplicitAny: router*/
import Icon from "@react-native-vector-icons/lucide";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Book, List, NewBook, Read, Setting } from "@screens/";
import { colors } from "@theme";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
				sceneStyle: {
					backgroundColor: "#fff",
					paddingHorizontal: 20,
				},
				tabBarActiveTintColor: colors.primary,
				tabBarItemStyle: {
					height: 55,
					backgroundColor:
						route.name ===
						navigation.getState().routeNames[navigation.getState().index]
							? colors.secondary
							: "#fff",
					borderStartStartRadius: route.name === "list" ? 16 : 0,
					borderEndStartRadius: route.name === "list" ? 16 : 0,
					borderEndEndRadius: route.name === "settings" ? 16 : 0,
					borderStartEndRadius: route.name === "settings" ? 16 : 0,
					zIndex:
						route.name !==
						navigation.getState().routeNames[navigation.getState().index]
							? 1
							: 0,
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 3,
					},
					shadowOpacity: 0.29,
					shadowRadius: 4.65,
					elevation: 7,
					borderWidth: 1,
					borderColor: "#E5E5EA",
				},
				tabBarStyle: {
					backgroundColor: "transparent",
					borderColor: "red",
					borderTopWidth: 0,
					borderRadius: 16,
					height: 55,
					position: "absolute",
					bottom: bottom || 20,
					margin: 7,
					marginHorizontal: isPortrait ? width * 0.05 : width * 0.25,
				},
			})}
		>
			<RootTabs.Screen
				name="list"
				component={List as any}
				options={{
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
				contentStyle: {
					backgroundColor: "#fff",
					paddingHorizontal: 20,
				},
			}}
		>
			<RootStackNav.Screen
				name="home"
				component={RootTabsNavigation}
				options={{
					contentStyle: {
						paddingVertical: 0,
					},
				}}
			/>
			<RootStackNav.Screen name="book" component={Book} />
			<RootStackNav.Screen
				name="read"
				component={Read}
				options={{
					contentStyle: {
						paddingHorizontal: 0,
					},
				}}
			/>
			<RootStackNav.Screen name="newBook" component={NewBook} />
		</RootStackNav.Navigator>
	);
};
