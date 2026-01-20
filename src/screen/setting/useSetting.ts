import * as RNFS from "@dr.pogodin/react-native-fs";
import { pick } from "@react-native-documents/picker";
import { Realm, useQuery, useRealm } from "@realm/react";
import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Share from "react-native-share";
import uuid from "react-native-uuid";
import { unzip, zip } from "react-native-zip-archive";
import type { ColorFormatsObject } from "reanimated-color-picker";
import { useForm } from "@/common/hooks";
import { Book } from "@/common/schemas";
import { themes, useSettingStore } from "@/common/stores";
import { colors } from "@/common/theme";

export default () => {
	const realm = useRealm();
	const booksStore = useQuery(Book);
	const currentTheme = useSettingStore((state) => state.currentTheme);
	const fontSize = useSettingStore((state) => state.fontSize);
	const textAlign = useSettingStore((state) => state.textAlign);
	const lineHeight = useSettingStore((state) => state.lineHeight);
	const paddingHorizontal = useSettingStore((state) => state.paddingHorizontal);
	const notes = useSettingStore((state) => state.notes);
	const currentFlow = useSettingStore((state) => state.currentFlow);
	const design = useSettingStore((state) => state.design);
	const orderBy = useSettingStore((state) => state.orderBy);
	const categories = useSettingStore((state) => state.categories);

	const setCurrentTheme = useSettingStore((state) => state.setCurrentTheme);
	const setFontSize = useSettingStore((state) => state.setFontSize);
	const setTextAlign = useSettingStore((state) => state.setTextAlign);
	const setLineHeight = useSettingStore((state) => state.setLineHeight);
	const setPaddingHorizontal = useSettingStore(
		(state) => state.setPaddingHorizontal,
	);
	const setNotes = useSettingStore((state) => state.setNotes);
	const setFlow = useSettingStore((state) => state.setFlow);
	const setDesign = useSettingStore((state) => state.setDesign);
	const setOrderBy = useSettingStore((state) => state.setOrderBy);
	const setCategories = useSettingStore((state) => state.setCategories);

	const [showModal, setShowModal] = useState<boolean>(false);
	const [showNewCategory, setShowNewCategory] = useState<boolean>(false);
	const [newCategory, setNewCategory] = useState<string>("");

	const { form, onChange, resetForm } = useForm<_IFormNotes, never>({
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

	const getFileName = (file: string) => file.split("/").pop();

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
			_id: book._id.toHexString(),
			image: book.image.replace(RNFS.DocumentDirectoryPath, ""),
			file: book.file.replace(RNFS.DocumentDirectoryPath, ""),
		}));

		const data: _IDataBackup = {
			setting: {
				currentTheme,
				fontSize,
				textAlign,
				lineHeight,
				paddingHorizontal,
				notes,
				currentFlow,
				orderBy,
				design,
				categories,
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
		await handleClearBackup();
		const zipResult = await zip(listFiles, zipPath);
		if (Platform.OS === "android") {
			const fileExists = await RNFS.exists(zipResult);
			if (!fileExists) {
				throw new Error("El archivo ZIP no existe");
			}
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
			let newPathFile = "";
			let nameFile = "";
			if (Platform.OS === "android") {
				// Soportar content:// y file://
				if (result.uri.startsWith("content://")) {
					// Leer como base64 y escribir en destino
					nameFile =
						getFileName(
							result.name ? result.name : `import-${uuid.v4()}.zip`,
						) || `import-${uuid.v4()}.zip`;
					newPathFile = `${RNFS.DocumentDirectoryPath}/${nameFile}`;
					const fileContent = await RNFS.readFile(result.uri, "base64");
					await RNFS.writeFile(newPathFile, fileContent, "base64");
				} else {
					// file://
					const decodedUri = decodeURIComponent(result.uri);
					const file = decodedUri.replaceAll("file://", "");
					nameFile = getFileName(file) || `import-${uuid.v4()}.zip`;
					newPathFile = `${RNFS.DocumentDirectoryPath}/${nameFile}`;
					await RNFS.copyFile(result.uri, newPathFile);
				}
			} else {
				// iOS
				const decodedUri = decodeURIComponent(result.uri);
				const file = decodedUri.replaceAll("file://", "");
				nameFile = getFileName(file) || `import-${uuid.v4()}.zip`;
				newPathFile = `${RNFS.DocumentDirectoryPath}/${nameFile}`;
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

			const pathBooks = `${RNFS.DocumentDirectoryPath}/books/images`;
			if (!(await RNFS.exists(pathBooks))) {
				await RNFS.mkdir(pathBooks);
			}

			const dataContent = await RNFS.readFile(dataPath, "utf8");
			const backupData: _IDataBackup = JSON.parse(dataContent);

			if (type === "books" || type === "all") {
				await Promise.all(
					backupData.books.map(async (book) => {
						const urlImage = `${RNFS.DocumentDirectoryPath}/unzip-backups/${getFileName(book.image)}`;
						const urlFile = `${RNFS.DocumentDirectoryPath}/unzip-backups/${getFileName(book.file)}`;
						const urlImageOut = `${RNFS.DocumentDirectoryPath}/books/images/${getFileName(book.image)}`;
						const urlFileOut = `${RNFS.DocumentDirectoryPath}/books/${getFileName(book.file)}`;
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

						realm.write(() => {
							if (!book._id) {
								realm.create(Book, {
									...book,
									_id: book._id
										? new Realm.BSON.ObjectId(book._id)
										: new Realm.BSON.ObjectId(),
									image: urlImageOut,
									file: urlFileOut,
									opinion: book.opinion || "",
									currentPage: book.currentPage || "",
								});
								return;
							}
							const bookRealm = realm.objectForPrimaryKey<Book>(
								"Book",
								new Realm.BSON.ObjectId(book._id),
							);
							if (bookRealm) {
								realm.delete(bookRealm);
							}
							realm.create(Book, {
								...book,
								_id: new Realm.BSON.ObjectId(book._id),
								image: urlImageOut,
								file: urlFileOut,
								opinion: book.opinion || "",
								currentPage: book.currentPage || "",
							});
						});
					}),
				);
			}

			if (type === "settings" || type === "all") {
				setCurrentTheme(backupData.setting.currentTheme);
				setFontSize(backupData.setting.fontSize);
				setTextAlign(backupData.setting.textAlign);
				setLineHeight(backupData.setting.lineHeight);
				setPaddingHorizontal(backupData.setting.paddingHorizontal);
				setNotes(backupData.setting.notes);
				setFlow(backupData.setting.currentFlow);
				if (backupData.setting.design) setDesign(backupData.setting.design);

				if (backupData.setting.orderBy) setOrderBy(backupData.setting.orderBy);
				if (backupData.setting.categories)
					setCategories(backupData.setting.categories);
			}

			await RNFS.unlink(target);

			Alert.alert("Éxito", "Se ha importado la copia de seguridad.");
		} catch (error) {
			console.error("Error importing backup:", error);
			Alert.alert(
				"Error",
				`No se pudo importar la copia de seguridad. ${error}`,
			);
		}
	};

	const handleClearBackup = async () => {
		try {
			const path = `${RNFS.DocumentDirectoryPath}/`;
			const files = await RNFS.readDir(path);

			const zipFiles = files.filter(
				(file) => file.isFile() && file.name.toLowerCase().endsWith(".zip"),
			);
			for (const file of zipFiles) {
				try {
					await RNFS.unlink(file.path);
					console.log(`Eliminado: ${file.name}`);
				} catch (error) {
					console.log(`Error eliminando ${file.name}:`, error);
				}
			}
			// Alert.alert("Éxito", "Se ha eliminado la copia de seguridad.");
			return true;
		} catch (error) {
			console.error("Error deleting backup:", error);
			return false;
		}
	};

	const handleAddCategory = () => {
		const id = uuid.v4();
		const newlist = [...categories, { id, label: newCategory }];
		setCategories(newlist);
		setShowNewCategory(false);
		2;
	};

	const handleRemoveCategory = (id: string) => {
		const newlist = categories.filter((category) => category.id !== id);
		setCategories(newlist);
	};

	useEffect(() => {
		if (!showNewCategory) {
			setNewCategory("");
		}
	}, [showNewCategory]);

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
		handleClearBackup,
		showNewCategory,
		setShowNewCategory,
		newCategory,
		setNewCategory,
		categories,
		handleAddCategory,
		handleRemoveCategory,
		...form,
	};
};
