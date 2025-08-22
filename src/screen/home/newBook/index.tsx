import { Reader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import Icon from "@react-native-vector-icons/lucide";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import {
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
	InputFile,
	Loading,
	Text,
	TextInput,
	Toast,
} from "@/components";
import style from "./styles";
import useNewBook from "./useNewBook";

export const NewBook: FC<NativeStackScreenProps<_IRootStack, "newBook">> = ({
	navigation,
}) => {
	const {
		author,
		bytesToMB,
		description,
		file,
		handleSelectFile,
		loadingRender,
		image,
		language,
		onReady,
		publisher,
		rights,
		title,
		theme,
		onChange,
		onChangeImage,
		onSubmit,
		error,
		onCloseToast,
	} = useNewBook(navigation);
	const { bottom } = useSafeAreaInsets();

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior={Platform.select({
				ios: "padding",
				android: "height",
			})}
		>
			<Toast {...error} callbackEnd={onCloseToast} />
			<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
				<ScrollView
					contentContainerStyle={[
						style.root,
						{ flex: loadingRender ? 1 : undefined },
					]}
					showsVerticalScrollIndicator={false}
				>
					<ButtonBack label="Regresar" onPress={() => navigation.goBack()} />
					<Text style={style.title}>Agregar Libro</Text>
					<Text style={style.subtitle}>
						Sube un archivo EPUB a tu biblioteca personal
					</Text>
					<InputFile
						label={file?.name || "Seleccionar archivo"}
						textProps={{
							numberOfLines: 1,
							ellipsizeMode: "tail",
						}}
						size={file?.size ? bytesToMB(file.size) : undefined}
						onPress={handleSelectFile}
					/>
					{file !== null && loadingRender && (
						<View
							style={{
								flex: 1,
								borderRadius: 12,
								overflow: "hidden",
								marginTop: 10,
							}}
						>
							<Reader
								src={file?.uri}
								fileSystem={useFileSystem}
								onReady={onReady}
								renderLoadingFileComponent={() => (
									<Loading label="Cargando..." />
								)}
								renderOpeningBookComponent={() => (
									<Loading label="Abriendo..." />
								)}
								defaultTheme={theme}
								onDisplayError={(err) => console.log("Error:", err)}
							/>
						</View>
					)}

					{file !== null && !loadingRender && (
						<>
							<View style={style.detailContainer}>
								<Text style={[style.title, { marginBottom: 5 }]}>
									Detalle del Libro
								</Text>
								<TouchableOpacity
									style={style.btnImage}
									activeOpacity={0.7}
									onPress={onChangeImage}
								>
									{image ? (
										<Image
											source={{ uri: image }}
											style={{ width: 200, height: 300 }}
										/>
									) : (
										<View style={style.imageNotFound}>
											<Icon name="image-off" size={50} color="#666" />
										</View>
									)}
									<Text style={style.labelImage}>
										Puede cambiar la imagen de portada precionando la imagen
									</Text>
								</TouchableOpacity>
								<TextInput
									label="Título"
									value={title}
									editable={!loadingRender}
									onChangeText={(value) => onChange(value, "title")}
								/>
								<TextInput
									label="Autor"
									value={author}
									editable={!loadingRender}
									onChangeText={(value) => onChange(value, "author")}
								/>
								<TextInput
									label="Descripción"
									value={description}
									multiline
									numberOfLines={5}
									style={{ height: 100 }}
									editable={!loadingRender}
									onChangeText={(value) => onChange(value, "description")}
								/>
								{language && (
									<View style={style.characteristics}>
										<Text style={{ fontWeight: "bold" }}>Idioma:</Text>
										<Text>{language}</Text>
									</View>
								)}
								{publisher && (
									<View style={style.characteristics}>
										<Text style={{ fontWeight: "bold" }}>Editorial:</Text>
										<Text>{publisher}</Text>
									</View>
								)}
								{rights && (
									<View style={style.characteristics}>
										<Text style={{ fontWeight: "bold" }}>
											Derechos de Autor:
										</Text>
										<Text>{rights}</Text>
									</View>
								)}
							</View>
							<Button label="Agregar Libro" onPress={onSubmit} />
						</>
					)}

					<View style={{ height: bottom + 10 }} />
				</ScrollView>
			</TouchableWithoutFeedback>
		</KeyboardAvoidingView>
	);
};
