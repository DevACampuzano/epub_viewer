import Icon from "@react-native-vector-icons/lucide";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import {
	FlatList,
	StyleSheet,
	TouchableOpacity,
	useWindowDimensions,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Layout, Menu, Tags, Text, TextInput } from "@/common/components";
import { ItemList } from "@/common/components/itemList";
import { colors } from "@/common/theme";
import useSearchBooks from "./useSearchBooks";

export const SearchBooks: FC<
	NativeStackScreenProps<_IRootStack, "searchBooks">
> = ({ navigation }) => {
	const {
		searchTerm,
		handleChangeSearchText,
		searchResults,
		options,
		status,
		onChange,
		categories,
		category,
	} = useSearchBooks();
	const { width, height } = useWindowDimensions();
	const { bottom } = useSafeAreaInsets();
	const isPortrait = height > width;

	return (
		<Layout>
			<View style={{ gap: 10 }}>
				<View
					style={{
						flexDirection: "row",
						alignItems: "center",
						gap: 10,
						justifyContent: "space-between",
					}}
				>
					<TouchableOpacity
						onPress={() => navigation.goBack()}
						activeOpacity={0.7}
						style={{ zIndex: 1 }}
					>
						<Icon name="chevron-left" size={24} color={colors.primary} />
					</TouchableOpacity>
					<TextInput
						placeholder="Buscar libros..."
						containerProps={{
							style: { maxWidth: "80%", zIndex: 1 },
						}}
						value={searchTerm}
						onChangeText={handleChangeSearchText}
					/>
					<Menu
						icon={
							<Icon name="ellipsis-vertical" size={24} color={colors.primary} />
						}
					>
						<Menu.Item
							hasSubmenu
							submenuItems={options.map((op) => (
								<Menu.Item
									key={op.value}
									onPress={() => {
										if (status.includes(op.value)) {
											const list = status.filter((item) => item !== op.value);
											onChange(list, "status");
										} else {
											const list = [...status, op.value];
											onChange(list, "status");
										}
									}}
									style={{ gap: 5, flexDirection: "row", alignItems: "center" }}
								>
									<Text>{op.label}</Text>
									{status.includes(op.value) && (
										<Icon name="check" size={16} color={colors.primary} />
									)}
								</Menu.Item>
							))}
						>
							Estados
						</Menu.Item>
					</Menu>
				</View>
				<FlatList
					data={categories}
					showsHorizontalScrollIndicator={false}
					keyExtractor={(item) => item.id}
					contentContainerStyle={{
						gap: 8,
					}}
					renderItem={({ item }) => (
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() => {
								if (category.includes(item.label)) {
									const list = category.filter((cat) => cat !== item.label);
									onChange(list, "category");
								} else {
									const list = [...category, item.label];
									onChange(list, "category");
								}
							}}
						>
							<Tags
								label={item.label}
								labelProps={{
									style: {
										color: colors.primary,
									},
								}}
								containerProps={{
									style: {
										backgroundColor: category.includes(item.label)
											? colors.secondary
											: "transparent",

										borderWidth: category.includes(item.label) ? 0 : 1,
										borderColor: colors.primary,
									},
								}}
							/>
						</TouchableOpacity>
					)}
					horizontal
				/>
				<FlatList
					data={searchResults}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() =>
								navigation.navigate("book", { id: item._id.toHexString() })
							}
						>
							<ItemList
								image={item.image}
								title={item.title}
								author={item.author}
								progress={item.progress || 0}
								qualification={item.qualification || 0}
								index={index}
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
					keyExtractor={(item, index) => `${item._id.toHexString()}-${index}`}
					ListEmptyComponent={() => (
						<View
							style={[style.containerEmpty, { paddingBottom: bottom + 55 }]}
						>
							<Text style={style.textEmpty}>Aún no tienes libros</Text>
						</View>
					)}
					ListFooterComponent={() => (
						<View style={{ height: isPortrait ? bottom + 40 : bottom + 20 }} />
					)}
				/>
			</View>
		</Layout>
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
