import Icon from "@react-native-vector-icons/lucide";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Book, List, Read, Setting } from "@screens/";
import { colors } from "@theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const RootTabs = createBottomTabNavigator<_IRootTabs>();

const RootTabsNavigation = () => {
	const { bottom } = useSafeAreaInsets();
	return (
		<RootTabs.Navigator
			initialRouteName="list"
			screenOptions={{
				headerShown: false,
				sceneStyle: {
					backgroundColor: "#fff",
					paddingHorizontal: 20,
				},
				tabBarActiveTintColor: colors.primary,
				tabBarItemStyle: {
					height: 55,
				},
				tabBarActiveBackgroundColor: colors.secondary,
				tabBarStyle: {
					backgroundColor: "#FFFFFF",
					borderWidth: 1,
					borderColor: "#E5E5EA",
					borderRadius: 16,
					height: 55,
					position: "absolute",
					bottom,
					left: 20,
					right: 20,
					marginHorizontal: 20,
					shadowColor: "#000",
					shadowOffset: {
						width: 0,
						height: 3,
					},
					shadowOpacity: 0.29,
					shadowRadius: 4.65,
					elevation: 7,
				},
			}}
		>
			<RootTabs.Screen
				name="list"
				component={List}
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

export const RootStack = createNativeStackNavigator<_IRootStack>({
	initialRouteName: "home",
	screens: {
		home: RootTabsNavigation,
		book: {
			screen: Book,
		},
		read: {
			screen: Read,
		},
	},
	screenOptions: {
		headerShown: false,
	},
});
