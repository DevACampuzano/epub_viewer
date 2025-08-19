import { Button, Divider, Text } from "@components/";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBookStore } from "@/stores";
import Card from "./components/card";
import style from "./styles";

export const List: FC<NativeStackScreenProps<_IRootStack, "home">> = ({
	navigation,
}) => {
	const { bottom } = useSafeAreaInsets();
	const books = useBookStore((state) => state.books);
	const calculateProgress = useBookStore((state) => state.calculateProgress);
	return (
		<View style={style.root}>
			<View style={style.header}>
				<View style={{ gap: 10 }}>
					<Text style={style.title}>Mi Bliblioteca</Text>
					<Text>{books.length} Libro en tu colección</Text>
				</View>
				<Button
					label="Agregar"
					onPress={() => navigation.navigate("newBook")}
				/>
			</View>

			<Divider style={{ marginVertical: 10 }} />
			<FlatList
				data={books}
				renderItem={({ item }) => (
					<Card
						image={item.image}
						title={item.title}
						author={item.author}
						progress={calculateProgress(item.id)}
						qualification={item.qualification || 0}
					/>
				)}
				key={2}
				style={{ width: "100%", height: "100%" }}
				contentContainerStyle={{
					gap: 20,
					flex: 1,
				}}
				columnWrapperStyle={{
					justifyContent: "space-between",
				}}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={() => (
					<View style={[style.containerEmpty, { paddingBottom: bottom + 55 }]}>
						<Text style={style.textEmpty}>Aún no tienes libros</Text>
					</View>
				)}
				ListFooterComponent={() => <View style={{ height: bottom + 55 }} />}
			/>
		</View>
	);
};
