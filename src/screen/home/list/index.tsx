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
import { Button, Divider, Menu, ProgressBar, Text } from "@/common/components";
import { colors } from "@/common/theme";
import { Card, ItemList } from "./components";
import style from "./styles";
import useList from "./useList";

export const List: FC<NativeStackScreenProps<_IRootStack, "home">> = ({
	navigation,
}) => {
	const {
		books,
		orderBy,
		design,
		setOrderBy,
		setDesign,
		progress,
		booksRead,
		listMenuOptionDesign,
		listMenuOptionOrderBy,
	} = useList();
	const { width, height } = useWindowDimensions();
	const { bottom } = useSafeAreaInsets();

	const isPortrait = height > width;

	return (
		<ScrollView
			contentContainerStyle={style.root}
			showsVerticalScrollIndicator={false}
		>
			<View style={style.header}>
				<View style={{ gap: 10 }}>
					<Text style={style.title}>Mi Bliblioteca</Text>
				</View>
				<View style={{ gap: 10 }}>
					<Button
						label="Agregar"
						onPress={() => navigation.navigate("newBook")}
						style={{
							zIndex: 1,
						}}
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
			<View
				style={{
					gap: 20,
					flexDirection: "row",
					justifyContent: "flex-end",
					alignItems: "center",
					paddingHorizontal: 5,
				}}
			>
				<View style={{ alignSelf: "flex-start", marginRight: "auto" }}>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
						<Icon name="library" color={colors.primary} size={15} />
						<Text>{books.length} Libro en colección</Text>
					</View>
					<View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
						<Icon name="book-check" color={colors.primary} size={15} />
						<Text>{booksRead.length} Libro leído</Text>
					</View>
				</View>

				<TouchableOpacity
					activeOpacity={0.7}
					style={{ zIndex: 1 }}
					onPress={() => navigation.navigate("searchBooks")}
				>
					<Icon name="search" size={20} color={colors.primary} />
				</TouchableOpacity>
				<Menu
					icon={
						<Icon name="ellipsis-vertical" size={24} color={colors.primary} />
					}
					menuProps={{
						style: {
							minWidth: 200,
						},
					}}
				>
					<Menu.Item
						hasSubmenu
						submenuItems={listMenuOptionDesign.map((op) => (
							<Menu.Item
								key={op.label}
								onPress={() => setDesign(op.value)}
								style={{ gap: 5, flexDirection: "row", alignItems: "center" }}
							>
								<Text>{op.label}</Text>
								{design === op.value && (
									<Icon name="check" size={16} color={colors.primary} />
								)}
							</Menu.Item>
						))}
					>
						Cambiar Diseño
					</Menu.Item>
					<Divider />
					<Menu.Item
						hasSubmenu
						submenuItems={listMenuOptionOrderBy.map((op) => (
							<Menu.Item
								key={op.label}
								onPress={() => setOrderBy(op.value)}
								style={{ flexDirection: "row", alignItems: "center" }}
							>
								<Text>{op.label}</Text>
								{orderBy === op.value && (
									<Icon name="check" size={16} color={colors.primary} />
								)}
							</Menu.Item>
						))}
					>
						Ordenar por
					</Menu.Item>
				</Menu>
			</View>

			{design === "list" ? (
				<FlatList
					data={books}
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
			) : (
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
					style={{
						width: "100%",
						height: "100%",
					}}
					contentContainerStyle={{
						gap: 20,
						width: "100%",
						paddingHorizontal: 4,
					}}
					columnWrapperStyle={{
						justifyContent: isPortrait ? "space-between" : "flex-start",
						gap: "1%",
					}}
					numColumns={isPortrait ? 2 : 4}
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
			)}
		</ScrollView>
	);
};
