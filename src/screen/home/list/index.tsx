import { View } from "react-native";
import { Divider, Text } from "../../../components";
export const List = () => {
	return (
		<View style={{ flex: 1, paddingVertical: 10, gap: 10 }}>
			<Text
				style={{
					fontWeight: "bold",
					fontSize: 25,
				}}
			>
				Mi Bliblioteca
			</Text>
			<Text>1 Libro en tu colección</Text>
			<Divider style={{ marginVertical: 10 }} />
		</View>
	);
};
