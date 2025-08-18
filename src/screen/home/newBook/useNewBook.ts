import { useReader } from "@epubjs-react-native/core";
import { pick } from "@react-native-documents/picker";
import { useState } from "react";
import { launchImageLibrary } from "react-native-image-picker";
import { useForm } from "@/hooks";

export default () => {
	const { form, setForm, onChange } = useForm<_IFormNewBook, never>({
		file: null,
		image: "",
		title: "",
		author: "",
		description: "",
		language: "",
		publisher: "",
		rights: "",
	});
	const [loadingRender, setLoadingRender] = useState<boolean>(false);
	const { getMeta, theme } = useReader();
	theme.body.background = "#f5f5f5";

	const handleSelectFile = async () => {
		const [result] = await pick({
			mode: "open",
			allowMultiSelection: false,
			type: ["org.idpf.epub-container", "application/epub+zip"],
		});
		if (result) {
			onChange(result, "file");
			setLoadingRender(true);
		}
	};
	const bytesToMB = (bytes: number): number => {
		return Math.round((bytes / (1024 * 1024)) * 100) / 100;
	};
	const onReady = () => {
		const data: _IMeta = getMeta() as _IMeta;

		setForm((form) => ({
			...form,
			author: data?.author,
			description: data?.description,
			language: data?.language,
			publisher: data?.publisher,
			rights: data?.rights,
			title: data?.title,
			image: data?.cover,
		}));
		setLoadingRender(false);
	};
	const onChangeImage = async () => {
		const data = await launchImageLibrary({
			mediaType: "photo",
			quality: 1,
			includeBase64: true,
		});
		if (data?.assets?.[0]?.base64) {
			const newImageData = data?.assets[0];
			const newBase64 = `data:${newImageData.type};base64,${newImageData.base64}`;

			onChange(newBase64, "image");
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
	};
};
