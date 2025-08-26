import { useState } from "react";
import { Alert } from "react-native";
import { useSharedValue } from "react-native-reanimated";
import uuid from "react-native-uuid";
import type { ColorFormatsObject } from "reanimated-color-picker";
import { useForm } from "@/common/hooks";
import { useSettingStore } from "@/common/stores";
import { colors } from "@/common/theme";

interface IFormNotes {
	label: string;
	color: string;
	style: "highlight" | "underline";
}
export default () => {
	const themes = useSettingStore((state) => state.themes);
	const currentTheme = useSettingStore((state) => state.currentTheme);
	const fontSize = useSettingStore((state) => state.fontSize);
	const textAlign = useSettingStore((state) => state.textAlign);
	const lineHeight = useSettingStore((state) => state.lineHeight);
	const paddingHorizontal = useSettingStore((state) => state.paddingHorizontal);
	const notes = useSettingStore((state) => state.notes);

	const setCurrentTheme = useSettingStore((state) => state.setCurrentTheme);
	const setFontSize = useSettingStore((state) => state.setFontSize);
	const setTextAlign = useSettingStore((state) => state.setTextAlign);
	const setLineHeight = useSettingStore((state) => state.setLineHeight);
	const setPaddingHorizontal = useSettingStore(
		(state) => state.setPaddingHorizontal,
	);
	const setNotes = useSettingStore((state) => state.setNotes);
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
		...form,
	};
};
