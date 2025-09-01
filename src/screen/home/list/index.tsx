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
import { ItemList } from "@/common/components/itemList";
import { colors } from "@/common/theme";
import { Card } from "./components";
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
		orderBooks,
	} = useList();
	const { width, height } = useWindowDimensions();
	const { bottom, top: paddingTop } = useSafeAreaInsets();

	const isPortrait = height > width;

	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<View style={[style.header, { paddingTop: paddingTop + 10 }]}>
				<View
					style={{
						height: 500,
						backgroundColor: colors.primary,
						left: 0,
						right: 0,
						position: "absolute",
						borderEndEndRadius: 50,
						borderEndStartRadius: 50,
					}}
				/>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						alignItems: "center",
						width: "100%",
					}}
				>
					<View style={{ gap: 10 }}>
						<Text style={style.title}>Mi Bliblioteca</Text>
						<Text style={{ color: "white" }}>¿Que Leiste Recientemente?</Text>
					</View>
					<Button
						label="Agregar"
						onPress={() => navigation.navigate("newBook")}
						labelProps={{ style: { color: "#3a3a3a", fontWeight: "bold" } }}
						style={{
							backgroundColor: colors.secondary,
							height: 40,
						}}
					/>
				</View>
				<FlatList
					data={orderBooks("lastReading")
						.filter((item) => item.progress < 100)
						.slice(0, 5)}
					renderItem={({ item, index }) => (
						<TouchableOpacity
							activeOpacity={0.7}
							onPress={() =>
								navigation.navigate("book", {
									id: item._id.toHexString(),
								})
							}
						>
							<Card
								image={item.image}
								title={item.title}
								author={item.author}
								progress={item.progress || 0}
								qualification={item.qualification || 0}
								index={index}
								stylesContainer={{ maxWidth: 200 }}
							/>
						</TouchableOpacity>
					)}
					keyExtractor={(item, index) => `${item._id.toHexString()}-${index}`}
					horizontal
					showsHorizontalScrollIndicator={false}
					contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
					ListEmptyComponent={() => (
						<View style={style.containerEmpty}>
							<Text style={style.textEmpty}>No hay lecturas recientes</Text>
						</View>
					)}
				/>
			</View>
			<View style={style.root}>
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
				{design === "list" ? (
					<FlatList
						data={books}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() =>
									navigation.navigate("book", {
										id: item._id.toHexString(),
									})
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
							<View
								style={{ height: isPortrait ? bottom + 40 : bottom + 20 }}
							/>
						)}
					/>
				) : (
					<FlatList
						data={books}
						renderItem={({ item, index }) => (
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() =>
									navigation.navigate("book", {
										id: item._id.toHexString(),
									})
								}
								style={{ width: isPortrait ? "49%" : "24%", height: "100%" }}
							>
								<Card
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
						key={isPortrait ? 2 : 4}
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
							<View
								style={{ height: isPortrait ? bottom + 40 : bottom + 20 }}
							/>
						)}
					/>
				)}
			</View>
		</ScrollView>
	);
};
