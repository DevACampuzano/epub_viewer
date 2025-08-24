import * as RNFS from "@dr.pogodin/react-native-fs";
import { type Location, useReader } from "@epubjs-react-native/core";
import { pick } from "@react-native-documents/picker";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Platform } from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import uuid from "react-native-uuid";
import { useForm } from "@/hooks";
import { useBookStore } from "@/stores";

export default (
	navigation: NativeStackNavigationProp<_IRootStack, "newBook", undefined>,
) => {
	const { id, form, setForm, onChange } = useForm<_IFormNewBook, never>({
		file: null,
		image: "",
		title: "",
		author: "",
		description: "",
		language: "",
		publisher: "",
		rights: "",
		totalPages: 0,
		progress: 0,
		id: uuid.v4(),
	});
	const [loadingRender, setLoadingRender] = useState<boolean>(false);
	const [error, setError] = useState<Omit<_PropsToast, "callbackEnd">>({
		msg: "",
		show: false,
		icon: "info",
	});
	const { getMeta, theme } = useReader();
	const addBook = useBookStore((state) => state.addBook);
	theme.body.background = "#f5f5f5";

	const handleSelectFile = async () => {
		const [result] = await pick({
			mode: "open",
			allowMultiSelection: false,
			type: ["org.idpf.epub-container", "application/epub+zip"],
		});
		if (result) {
			if (Platform.OS === "android") {
				const newPathFile = `${RNFS.DocumentDirectoryPath}/${id}.epub`;
				await RNFS.copyFile(result.uri, newPathFile);
				result.uri = newPathFile;
			}

			onChange(result, "file");
			setLoadingRender(true);
		}
	};
	const bytesToMB = (bytes: number): number => {
		return Math.round((bytes / (1024 * 1024)) * 100) / 100;
	};

	const detectHtmlContent = (text: string) => {
		if (!text) return { hasHtml: false, plainText: text };

		const htmlTagRegex = /<\/?[a-z][\s\S]*>/i;
		const hasHtml = htmlTagRegex.test(text);

		let plainText = text;
		if (hasHtml) {
			plainText = text.replace(/<[^>]*>/g, "").trim();
			plainText = plainText
				.replace(/&amp;/g, "&")
				.replace(/&lt;/g, "<")
				.replace(/&gt;/g, ">")
				.replace(/&quot;/g, '"')
				.replace(/&#39;/g, "'")
				.replace(/&nbsp;/g, " ");
		}

		return { hasHtml, plainText, originalText: text };
	};

	const onReady = async (
		totalLocations: number,
		_currentLocation: Location,
		progress: number,
	) => {
		try {
			const data: _IMeta = getMeta() as _IMeta;

			const description = detectHtmlContent(data?.description || "");

			const imagesDir = `${RNFS.DocumentDirectoryPath}/images`;
			if (!(await RNFS.exists(imagesDir))) {
				await RNFS.mkdir(imagesDir);
			}

			const dataImage = data?.cover?.split(";");
			const type = dataImage[0].split("/")[1];

			const newPathFile = `${RNFS.DocumentDirectoryPath}/images/${id}.${type}`;

			await RNFS.writeFile(newPathFile, dataImage[1].split(",")[1], "base64");
			setForm((form) => ({
				...form,
				author: data?.author,
				description: description.plainText,
				language: data?.language,
				publisher: data?.publisher,
				rights: data?.rights,
				title: data?.title,
				image: newPathFile,
				totalPages: totalLocations,
				progress: progress,
			}));
			setLoadingRender(false);
		} catch (error) {
			console.log("Error getting metadata:", error);
			Alert.alert("Error", "No se pudo leer el archivo.", [{ text: "OK" }]);
		}
	};

	const onChangeImage = async () => {
		const data = await launchImageLibrary({
			mediaType: "photo",
			quality: 1,
			includeBase64: true,
		});
		if (data?.assets?.[0]?.base64) {
			const newImageData = data?.assets[0];

			try {
				if (await RNFS.exists(form.image)) {
					await RNFS.unlink(form.image);
				}
				if (newImageData.base64 === undefined) {
					throw new Error("No image data");
				}
				const imagesDir = `${RNFS.DocumentDirectoryPath}/images`;
				if (!(await RNFS.exists(imagesDir))) {
					await RNFS.mkdir(imagesDir);
				}
				const fileExtension = newImageData.type?.split("/")[1];
				const newPathFile = `${RNFS.DocumentDirectoryPath}/images/${id}.${fileExtension}`;

				if (await RNFS.exists(newPathFile)) {
					await RNFS.unlink(newPathFile);
				}

				await RNFS.writeFile(newPathFile, newImageData.base64, "base64");

				onChange(newPathFile, "image");
			} catch (error) {
				console.log("Error writing image file:", error);
				Alert.alert("Error", "Se produjo un error al cambiar la imagen..", [
					{ text: "OK" },
				]);
			}
		}
	};

	const onSubmit = async () => {
		try {
			if (form.file === null) {
				throw new Error("File is required");
			}
			const newPathFile = `${RNFS.DocumentDirectoryPath}/${id}.epub`;
			if (Platform.OS === "ios") {
				let decodedUri = decodeURIComponent(form.file.uri);

				let sourceExists = false;
				if (decodedUri.startsWith("file://")) {
					const pathWithoutProtocol = decodedUri.replace("file://", "");
					console.log("Path without protocol:", pathWithoutProtocol);

					sourceExists = await RNFS.exists(decodedUri);
					if (!sourceExists) {
						sourceExists = await RNFS.exists(pathWithoutProtocol);
						if (sourceExists) {
							decodedUri = pathWithoutProtocol;
							console.log("Using path without protocol");
						}
					}
				} else {
					sourceExists = await RNFS.exists(decodedUri);
				}

				if (!sourceExists) {
					throw new Error("Source file does not exist");
				}

				try {
					await RNFS.copyFile(decodedUri, newPathFile);
				} catch (copyError) {
					console.log(
						"Direct copy failed, trying alternative method:",
						copyError,
					);
					try {
						const fileContent = await RNFS.readFile(decodedUri, "base64");
						await RNFS.writeFile(newPathFile, fileContent, "base64");
						console.log("Alternative copy method successful");
					} catch (alternativeError) {
						const errorMessage =
							alternativeError instanceof Error
								? alternativeError.message
								: String(alternativeError);
						throw new Error(`File copy failed: ${errorMessage}`);
					}
				}
				const newBook: _IBook = {
					...form,
					file: newPathFile,
					qualification: 0,
					createdAt: Date.now(),
					lastReading: Date.now(),
				};
				addBook(newBook);
			} else {
				const exists = await RNFS.exists(newPathFile);
				if (!exists || form.file.uri !== newPathFile) {
					const newPathFile = `${RNFS.DocumentDirectoryPath}/${id}.epub`;
					await RNFS.copyFile(form.file.uri, newPathFile);
				}

				const newBook: _IBook = {
					...form,
					file: newPathFile,
					qualification: 0,
					createdAt: Date.now(),
					lastReading: Date.now(),
				};
				addBook(newBook);
			}

			navigation.goBack();
		} catch (error) {
			console.log("Error adding book:", error);
			setError({
				msg: "Ocurrio un error al agregar el libro.",
				icon: "octagon-alert",
				show: true,
			});
		}
	};

	const onCloseToast = () => {
		setError({
			msg: "",
			show: false,
			icon: "info",
		});
	};

	const goBack = async () => {
		try {
			if (form.image && (await RNFS.exists(form.image))) {
				await RNFS.unlink(form.image);
			}
		} catch (error) {
			console.log("Error deleting image:", error);
		} finally {
			navigation.goBack();
		}
	};
	return {
		...form,
		onReady,
		bytesToMB,
		handleSelectFile,
		loadingRender,
		theme,
		onChange,
		onChangeImage,
		onSubmit,
		onCloseToast,
		error,
		goBack,
	};
};
