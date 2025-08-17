import Icon from "@react-native-vector-icons/lucide";

import { Text, View } from "react-native";
export const List = () => {
	return (
		<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
			<Text>List</Text>
			<Icon name="book" />
		</View>
	);
};
