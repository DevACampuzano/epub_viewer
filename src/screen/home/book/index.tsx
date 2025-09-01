import Icon from "@react-native-vector-icons/lucide";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { type FC, useState } from "react";
import {
	FlatList,
	Image,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	TouchableOpacity,
	TouchableWithoutFeedback,
	View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
	Button,
	ButtonBack,
	Divider,
	Layout,
	Menu,
	ProgressBar,
	Tags,
	Text,
	TextInput,
} from "@/common/components";
import { colors } from "@/common/theme";
import style from "./styles";
import useBook from "./useBook";

export const Book: FC<NativeStackScreenProps<_IRootStack, "book">> = ({
	route,
	navigation,
}) => {
	const [showCompleteDescription, setShowCompleteDescription] = useState(false);
	const { id } = route.params;
	const {
		title,
		image,
		author,
		description,
		createdAt,
		language,
		publisher,
		rights,
		onDeleteBook,
		updateBooks,
		markBookAsRead,
		activeEdit,
		onChange,
		resetForm,
		text,
		totalPages,
		progress,
		qualification,
		finalDate,
		opinion,
		openBook,
		categories,
		categoryList,
		handleCategoryPress,
	} = useBook(id, navigation);
	const { bottom } = useSafeAreaInsets();

	return (
		<Layout>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.select({
					ios: "padding",
					android: "height",
				})}
			>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<ScrollView
						contentContainerStyle={style.root}
						showsVerticalScrollIndicator={false}
					>
						<ButtonBack
							label="Detalles del Libro"
							onPress={() => navigation.goBack()}
						/>
						<Divider />
						<View style={style.section}>
							{image ? (
								<Image
									source={{ uri: `file://${image}` }}
									height={400}
									width={300}
									style={{ alignSelf: "center", borderRadius: 5 }}
									resizeMode="stretch"
								/>
							) : (
								<View style={style.imageNotFound}>
									<Icon name="image-off" size={50} color="#666" />
								</View>
							)}
							<Text style={{ fontSize: 25, fontWeight: "bold" }}>
								{title || ""}
							</Text>
							<Text style={{ fontSize: 20, color: "#666" }}>
								{author || ""}
							</Text>
							<View style={style.progressContainer}>
								<Text style={style.progressText}>Progreso</Text>
								<Text
									style={style.progressPercentage}
								>{`${Math.round(progress || 0)}%`}</Text>
							</View>
							<ProgressBar progress={progress || 0} />
							<Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
								Calificación
							</Text>
							<View style={style.ratingContainer}>
								{Array.from({ length: 5 }, (_, index) => (
									<TouchableOpacity
										key={`star-${qualification}-position-${index + 1}`}
										activeOpacity={0.7}
										onPress={() => updateBooks({ qualification: index + 1 })}
									>
										<Icon
											name="star"
											size={25}
											color={
												index < (qualification || 0) ? colors.primary : "gray"
											}
										/>
									</TouchableOpacity>
								))}
							</View>
						</View>
						<View style={[style.section, { zIndex: 1000 }]}>
							<View
								style={{
									width: "100%",
									justifyContent: "space-between",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<Text style={{ fontSize: 25, fontWeight: "bold" }}>
									Categorias
								</Text>
								<Menu
									icon={
										<Icon
											name="ellipsis-vertical"
											size={24}
											color={colors.primary}
										/>
									}
									style={{ zIndex: 1000 }}
								>
									{categoryList.map((category) => (
										<Menu.Item
											key={category.id}
											onPress={() => handleCategoryPress(category.label)}
										>
											<View
												style={{
													flexDirection: "row",
													alignItems: "center",
													gap: 10,
												}}
											>
												<Text>{category.label}</Text>
												{categories.includes(category.label) && (
													<Icon name="check" size={16} color={colors.primary} />
												)}
											</View>
										</Menu.Item>
									))}
								</Menu>
							</View>
							<FlatList
								data={categories}
								scrollEnabled={false}
								contentContainerStyle={{
									justifyContent: "center",
									gap: 10,
								}}
								columnWrapperStyle={{
									justifyContent: "flex-start",
									gap: 10,
									width: "100%",
								}}
								key={3}
								numColumns={3}
								renderItem={({ item }) => (
									<Tags
										label={item}
										containerProps={{
											style: {
												padding: 7,
												borderWidth: 1,
												borderColor: colors.primary,
												borderRadius: 5,
											},
										}}
										labelProps={{
											style: {
												color: colors.primary,
											},
										}}
									/>
								)}
								keyExtractor={(item, index) => `${item}-${index}`}
								ListEmptyComponent={
									<Text>No se ha registrado ninguna categoría</Text>
								}
							/>
						</View>
						<View style={style.section}>
							<Text style={{ fontSize: 25, fontWeight: "bold" }}>
								Descripción
							</Text>
							<TouchableOpacity
								activeOpacity={0.7}
								onPress={() =>
									setShowCompleteDescription(!showCompleteDescription)
								}
							>
								<Text
									style={{ fontSize: 16, color: "#666", textAlign: "justify" }}
									numberOfLines={showCompleteDescription ? undefined : 6}
								>
									{description || "No se encontro descripción"}
								</Text>
							</TouchableOpacity>
						</View>
						<View style={style.section}>
							<View
								style={{
									flexDirection: "row",
									justifyContent: "space-between",
									alignItems: "center",
									width: "100%",
								}}
							>
								<Text style={{ fontSize: 25, fontWeight: "bold" }}>
									Mi Opinión
								</Text>
								{!activeEdit && (
									<TouchableOpacity
										activeOpacity={0.7}
										onPress={() => onChange(true, "activeEdit")}
									>
										<Icon name="pencil" size={20} color={colors.primary} />
									</TouchableOpacity>
								)}
							</View>
							{activeEdit ? (
								<View style={{ width: "100%", gap: 10 }}>
									<TextInput
										value={text}
										onChangeText={(value) => onChange(value, "text")}
										placeholder="Escribe tu opinión"
										multiline
										numberOfLines={4}
									/>
									<View style={{ flexDirection: "row", gap: 10 }}>
										<Button
											label={
												<View style={style.labelButton}>
													<Icon name="check" size={20} color="white" />
													<Text style={{ color: "white" }}>Guardar</Text>
												</View>
											}
											onPress={() => {
												onChange(false, "activeEdit");
												updateBooks({ opinion: text });
											}}
										/>
										<Button
											label={
												<View style={style.labelButton}>
													<Icon name="x" size={20} />
													<Text>Cancelar</Text>
												</View>
											}
											style={{ backgroundColor: "transparent" }}
											onPress={() => {
												resetForm();
											}}
										/>
									</View>
								</View>
							) : (
								<Text
									style={{ fontSize: 16, color: "#666", textAlign: "justify" }}
								>
									{opinion || "No se ha registrado opinión"}
								</Text>
							)}
						</View>
						<View style={style.section}>
							<Text style={{ fontSize: 25, fontWeight: "bold" }}>
								Información
							</Text>
							<View style={style.rowDetails}>
								<Text>Agregado el:</Text>
								<Text>{new Date(createdAt).toLocaleDateString()}</Text>
							</View>
							{language && (
								<View style={style.rowDetails}>
									<Text>Idioma:</Text>
									<Text>{language || ""}</Text>
								</View>
							)}

							<View style={style.rowDetails}>
								<Text>Total de Páginas:</Text>
								<Text>{`${totalPages}` || ""}</Text>
							</View>

							{publisher && (
								<View style={style.rowDetails}>
									<Text>Editorial:</Text>
									<Text>{publisher || ""}</Text>
								</View>
							)}
							{rights && (
								<View style={style.rowDetails}>
									<Text>Derechos de autor:</Text>
									<Text>{rights || ""}</Text>
								</View>
							)}
							{finalDate && (
								<View style={style.rowDetails}>
									<Text>Fecha de finalización:</Text>
									<Text>{new Date(finalDate).toLocaleDateString()}</Text>
								</View>
							)}
						</View>
						<Button
							label={
								<View style={style.labelButton}>
									<Icon name="book-open" size={20} color="white" />
									<Text style={{ color: "white" }}>Continuar Leyendo</Text>
								</View>
							}
							style={{ backgroundColor: colors.primary }}
							onPress={openBook}
						/>
						<Button
							label={
								<View style={style.labelButton}>
									<Icon
										name="circle-check-big"
										size={20}
										color={colors.primary}
									/>
									<Text style={{ color: colors.primary }}>
										Marcar como leído
									</Text>
								</View>
							}
							variant="outline"
							onPress={markBookAsRead}
						/>
						<Button
							label={
								<View style={style.labelButton}>
									<Icon name="trash" size={20} color="white" />
									<Text style={{ color: "white" }}>Eliminar</Text>
								</View>
							}
							style={{ backgroundColor: colors.danger }}
							onPress={onDeleteBook}
						/>
						<View style={{ height: bottom + 10 }} />
					</ScrollView>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		</Layout>
	);
};
