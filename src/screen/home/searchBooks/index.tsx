import Icon from "@react-native-vector-icons/lucide";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { type FC, useCallback, useState } from "react";
import {
	FlatList,
	StyleSheet,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, TextInput } from "@/common/components";
import { useDebounce } from "@/common/hooks";
import { useBookStore } from "@/common/stores";
import { colors } from "@/common/theme";
import { ItemList } from "./components";

export const SearchBooks: FC<
	NativeStackScreenProps<_IRootStack, "searchBooks">
> = ({ navigation }) => {
	const { width, height } = useWindowDimensions();
	const { bottom } = useSafeAreaInsets();
	const isPortrait = height > width;
	const [searchTerm, setSearchTerm] = useState("");
	const [searchResults, setSearchResults] = useState<_IBook[]>([]);
	const searchBooks = useBookStore((state) => state.filterBooks);
	const debouncedRefetch = useDebounce(() => {
		if (searchTerm.trim() === "") {
			setSearchResults([]);
			// return;
		} else {
			const list = searchBooks(searchTerm.trim());
			setSearchResults(list);
		}
	}, 500);

	const handleChangeSearchText = useCallback(
		(text: string) => {
			setSearchTerm(text);
			debouncedRefetch();
		},
		[debouncedRefetch],
	);
	return (
		<View style={{ gap: 10 }}>
			<View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
				<TouchableOpacity>
					<Icon
						name="chevron-left"
						size={24}
						color={colors.primary}
						onPress={() => navigation.goBack()}
					/>
				</TouchableOpacity>
				<TextInput
					placeholder="Buscar libros..."
					style={{ width: "90%" }}
					value={searchTerm}
					onChangeText={handleChangeSearchText}
				/>
			</View>
			<FlatList
				data={searchResults}
				renderItem={({ item }) => (
					<TouchableOpacity
						activeOpacity={0.7}
						onPress={() => navigation.navigate("book", item)}
					>
						<ItemList
							image={item.image}
							title={item.title}
							author={item.author}
							progress={item.progress || 0}
							qualification={item.qualification || 0}
						/>
					</TouchableOpacity>
				)}
				scrollEnabled={false}
				style={{
					width: "100%",
					height: "100%",
					marginTop: 10,
				}}
				contentContainerStyle={{
					gap: 20,
					width: "100%",
					paddingHorizontal: 4,
				}}
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
		</View>
	);
};

const style = StyleSheet.create({
	containerEmpty: {
		height: "100%",
		alignItems: "center",
		justifyContent: "center",
	},
	textEmpty: {
		fontSize: 20,
		color: "#888",
		fontWeight: "bold",
	},
});
