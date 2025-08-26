import * as RNFS from "@dr.pogodin/react-native-fs";
import { pick } from "@react-native-documents/picker";
import { useState } from "react";
import { Alert, Platform } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Share from "react-native-share";
import uuid from "react-native-uuid";
import { unzip, zip } from "react-native-zip-archive";
import type { ColorFormatsObject } from "reanimated-color-picker";
import { useForm } from "@/common/hooks";
import { themes, useBookStore, useSettingStore } from "@/common/stores";
import { colors } from "@/common/theme";

interface IFormNotes {
	label: string;
	color: string;
	style: "highlight" | "underline";
}

type IDataBackup = {
	books: _IBook[];
	setting: StateSettings;
};

export default () => {
	const booksStore = useBookStore((state) => state.books);
	const addBooks = useBookStore((state) => state.addBooks);
	const currentTheme = useSettingStore((state) => state.currentTheme);
	const fontSize = useSettingStore((state) => state.fontSize);
	const textAlign = useSettingStore((state) => state.textAlign);
	const lineHeight = useSettingStore((state) => state.lineHeight);
	const paddingHorizontal = useSettingStore((state) => state.paddingHorizontal);
	const notes = useSettingStore((state) => state.notes);
	const currentFlow = useSettingStore((state) => state.currentFlow);

	const setCurrentTheme = useSettingStore((state) => state.setCurrentTheme);
	const setFontSize = useSettingStore((state) => state.setFontSize);
	const setTextAlign = useSettingStore((state) => state.setTextAlign);
	const setLineHeight = useSettingStore((state) => state.setLineHeight);
	const setPaddingHorizontal = useSettingStore(
		(state) => state.setPaddingHorizontal,
	);
	const setNotes = useSettingStore((state) => state.setNotes);
	const setFlow = useSettingStore((state) => state.setFlow);
	const [showModal, setShowModal] = useState<boolean>(false);
	const { form, onChange, resetForm } = useForm<IFormNotes, never>({
		label: "",
		color: colors.primary,
		style: "highlight",
	});
	const currentColor = useSharedValue(colors.primary);

	const handleAddNote = () => {
		if (!form.label.trim()) {
			Alert.alert("Error", "Por favor ingresa un título para la nota.", [
				{
					text: "Cancelar",
					style: "cancel",
				},
			]);
			return;
		}
		const newNote: Note = {
			id: uuid.v4(),
			label: form.label.trim(),
			color: form.color,
			style: form.style,
		};
		setNotes([...notes, newNote]);
		setShowModal(false);
		resetForm();
	};

	const handleRemoveNote = (id: string) => {
		setNotes(notes.filter((note) => note.id !== id));
	};

	const onColorChange = (color: ColorFormatsObject) => {
		"worklet";
		currentColor.value = color.hex;
	};

	const onColorPick = (color: ColorFormatsObject) => {
		onChange(color.hex, "color");
	};

	const handleSaveBackup = async () => {
		const idBackup = uuid.v4();
		const sourcePath = `${RNFS.DocumentDirectoryPath}/books/`;
		const backupFileName = `data.json`;
		const backupPath = `${RNFS.DocumentDirectoryPath}/${backupFileName}`;

		if (!(await RNFS.exists(sourcePath))) {
			await RNFS.mkdir(sourcePath);
		}

		const books = booksStore.map((book) => ({
			...book,
			image: book.image.replace(RNFS.DocumentDirectoryPath, ""),
			file: book.file.replace(RNFS.DocumentDirectoryPath, ""),
		}));

		const data: IDataBackup = {
			setting: {
				currentTheme,
				fontSize,
				textAlign,
				lineHeight,
				paddingHorizontal,
				notes,
				currentFlow,
			},
			books,
		};
		await RNFS.writeFile(backupPath, JSON.stringify(data), "utf8");

		const fileExists = await RNFS.exists(backupPath);
		if (!fileExists) {
			throw new Error("No se pudo crear el archivo de datos");
		}

		const zipPath = `${RNFS.DocumentDirectoryPath}/backup-${idBackup}.zip`;
		const listFiles = [backupPath];
		booksStore.forEach((item) => {
			listFiles.push(item.file);
			listFiles.push(item.image);
		});
		const zipResult = await zip(listFiles, zipPath);
		console.log(`ZIP creado en: ${zipResult}`);

		// Para Android, copiamos el archivo a una ubicación externa y usamos URI de archivo
		if (Platform.OS === "android") {
			// Verificar que el archivo existe
			const fileExists = await RNFS.exists(zipResult);
			if (!fileExists) {
				throw new Error("El archivo ZIP no existe");
			}

			// Copiar a Downloads directory que es más accesible
			const downloadsPath = `${RNFS.DownloadDirectoryPath}/backup-${idBackup}.zip`;
			await RNFS.copyFile(zipResult, downloadsPath);

			Alert.alert(
				"Compartir",
				"Se ha guardado la copia de seguridad en la carpeta de descargas. \n" +
					downloadsPath,
				[
					{
						text: "Aceptar",
						style: "default",
					},
				],
			);
		} else {
			// Para iOS, usamos file URI
			await Share.open({
				url: `file://${zipResult}`,
				filename: `backup-${idBackup}.zip`,
				title: "Copia de seguridad",
				message: "Aquí tienes tu copia de seguridad.",
			}).catch((err) => console.log(err));
			Alert.alert("Compartir", "Se ha compartido la copia de seguridad.", [
				{
					text: "Aceptar",
					style: "default",
				},
			]);
		}
	};

	const getFileName = (file: string) => file.split("/").pop();

	const handleImportBackup = async (type: "books" | "settings" | "all") => {
		const [result] = await pick({
			mode: "open",
			type: ["application/zip", "public.zip-archive"],
			multiple: false,
			includeBase64: true,
		});
		if (!result) {
			Alert.alert("Error", "No se seleccionó ningún archivo.");
			return;
		}
		try {
			const decodedUri = decodeURIComponent(result.uri);
			const file = decodedUri.replaceAll("file://", "");
			const nameFile = getFileName(file) || `import-${uuid.v4()}.zip`;
			const newPathFile = `${RNFS.DocumentDirectoryPath}/${nameFile}`;
			if (Platform.OS === "android") {
				await RNFS.copyFile(result.uri, newPathFile);
				result.uri = newPathFile;
			} else {
				const fileContent = await RNFS.readFile(decodedUri, "base64");
				await RNFS.writeFile(newPathFile, fileContent, "base64");
			}
			const target = `${RNFS.DocumentDirectoryPath}/unzip-backups/`;
			if (!(await RNFS.exists(target))) {
				await RNFS.mkdir(target);
			}
			await unzip(newPathFile, target);
			// Leer el archivo JSON de backup
			const dataPath = `${RNFS.DocumentDirectoryPath}/unzip-backups/data.json`;
			const dataExists = await RNFS.exists(dataPath);

			if (!dataExists) {
				Alert.alert(
					"Error",
					"No se encontró el archivo de datos en el backup.",
				);
				return;
			}

			const dataContent = await RNFS.readFile(dataPath, "utf8");
			const backupData: IDataBackup = JSON.parse(dataContent);

			if (type === "books" || type === "all") {
				const newBooks = await Promise.all(
					backupData.books.map(async (book) => {
						const urlImage = `${RNFS.DocumentDirectoryPath}/unzip-backups/${getFileName(book.image)}`;
						const urlFile = `${RNFS.DocumentDirectoryPath}/unzip-backups/${getFileName(book.file)}`;
						const urlImageOut = `${RNFS.DocumentDirectoryPath}${book.image}`;
						const urlFileOut = `${RNFS.DocumentDirectoryPath}${book.file}`;
						if (Platform.OS === "android") {
							await RNFS.copyFile(urlImage, urlImageOut);
							await RNFS.copyFile(urlFile, urlFileOut);
						} else {
							//image
							const imageContent = await RNFS.readFile(urlImage, "base64");
							await RNFS.writeFile(urlImageOut, imageContent, "base64");
							//file
							const fileContent = await RNFS.readFile(urlFile, "base64");
							await RNFS.writeFile(urlFileOut, fileContent, "base64");
						}
						return {
							...book,
							image: urlImageOut,
							file: urlFileOut,
						};
					}),
				);

				addBooks(newBooks);
			}

			if (type === "settings" || type === "all") {
				setCurrentTheme(backupData.setting.currentTheme);
				setFontSize(backupData.setting.fontSize);
				setTextAlign(backupData.setting.textAlign);
				setLineHeight(backupData.setting.lineHeight);
				setPaddingHorizontal(backupData.setting.paddingHorizontal);
				setNotes(backupData.setting.notes);
				setFlow(backupData.setting.currentFlow);
			}

			await RNFS.unlink(target);

			Alert.alert("Éxito", "Se ha importado la copia de seguridad.");
		} catch (error) {
			console.error("Error importing backup:", error);
		}
	};

	return {
		onChange,
		onColorChange,
		onColorPick,
		handleAddNote,
		handleRemoveNote,
		themes,
		currentTheme,
		fontSize,
		textAlign,
		lineHeight,
		setCurrentTheme,
		setFontSize,
		setTextAlign,
		setLineHeight,
		showModal,
		setShowModal,
		notes,
		setPaddingHorizontal,
		paddingHorizontal,
		handleSaveBackup,
		handleImportBackup,
		...form,
	};
};
