import { Button, Divider, ProgressBar, Text } from "@components/";
import Icon from "@react-native-vector-icons/lucide";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import {
	FlatList,
	ScrollView,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBookStore } from "@/stores";
import { colors } from "@/theme";
import Card from "./components/card";
import style from "./styles";

export const List: FC<NativeStackScreenProps<_IRootStack, "home">> = ({
	navigation,
}) => {
	const { bottom } = useSafeAreaInsets();
	const books = useBookStore((state) => state.books);
	const progress = useBookStore((state) => state.calculateOverallProgress());
	const booksRead = books.filter((book) => book.progress === 100);
	const { width, height } = useWindowDimensions();

	const isPortrait = height > width;

	return (
		<ScrollView
			contentContainerStyle={style.root}
			showsVerticalScrollIndicator={false}
		>
			<View style={style.header}>
				<View style={{ gap: 10 }}>
					<Text style={style.title}>Mi Bliblioteca</Text>
					<View style={{ gap: 10, flexDirection: "row" }}>
						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
						>
							<Icon name="library" color={colors.primary} size={15} />
							<Text>{books.length} Libro en colección</Text>
						</View>
						<View
							style={{ flexDirection: "row", alignItems: "center", gap: 5 }}
						>
							<Icon name="book-check" color={colors.primary} size={15} />
							<Text>{booksRead.length} Libro leído</Text>
						</View>
					</View>
				</View>
				<View style={{ gap: 10 }}>
					<Button
						label="Agregar"
						onPress={() => navigation.navigate("newBook")}
					/>
				</View>
			</View>
			<View
				style={{
					gap: 10,
					backgroundColor: "#f5f5f5",
					padding: 10,
					borderRadius: 10,
				}}
			>
				<View style={style.progressContainer}>
					<Text style={style.progressText}>Progreso</Text>
					<Text>{Math.round(progress)}%</Text>
				</View>
				<ProgressBar progress={progress} />
			</View>
			<Divider style={{ marginVertical: 10 }} />
			<FlatList
				data={books}
				renderItem={({ item }) => (
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("book", item)}
						style={{ width: isPortrait ? "49%" : "24%", height: "100%" }}
					>
						<Card
							image={item.image}
							title={item.title}
							author={item.author}
							progress={item.progress || 0}
							qualification={item.qualification || 0}
						/>
					</TouchableOpacity>
				)}
				key={isPortrait ? 2 : 4}
				scrollEnabled={false}
				style={{ width: "100%", height: "100%" }}
				contentContainerStyle={{
					gap: 20,
					width: "100%",
				}}
				columnWrapperStyle={{
					justifyContent: "space-between",
					gap: "1%",
				}}
				numColumns={isPortrait ? 2 : 4}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				ListEmptyComponent={() => (
					<View style={[style.containerEmpty, { paddingBottom: bottom + 55 }]}>
						<Text style={style.textEmpty}>Aún no tienes libros</Text>
					</View>
				)}
				ListFooterComponent={() => (
					<View style={{ height: isPortrait ? bottom + 40 : bottom + 20 }} />
				)}
			/>
		</ScrollView>
	);
};
