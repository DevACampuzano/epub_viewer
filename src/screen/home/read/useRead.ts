import { useReader } from "@epubjs-react-native/core";
import { usePreventRemove } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { useBookStore, useSettingStore } from "@/stores";
import { colors } from "@/theme";

export default (
	id: string,
	navigation: NativeStackNavigationProp<_IRootStack, "read", undefined>,
) => {
	const [exit, setExit] = useState(false);
	const updateBook = useBookStore((state) => state.updateBook);
	const currentTheme = useSettingStore((state) => state.currentTheme);
	const fontSize = useSettingStore((state) => state.fontSize);
	const textAlign = useSettingStore((state) => state.textAlign);
	const lineHeight = useSettingStore((state) => state.lineHeight);
	const {
		currentLocation,
		progress,
		totalLocations,
		changeFontSize,
		changeTheme,
		toc,
		section,
	} = useReader();

	const handleSaveProgress = () => {
		if (currentLocation) {
			updateBook(id, {
				currentPage: currentLocation.start.cfi,
				progress,
				totalPages: totalLocations,
				finalDate: progress === 100 ? Date.now() : undefined,
			});
			setExit(true);
		}
	};
	usePreventRemove(!exit, () => {
		if (currentLocation) {
			handleSaveProgress();
		}
	});

	const onClose = () => {
		handleSaveProgress();
		navigation.goBack();
	};

	const onReady = () => {
		changeFontSize(`${fontSize}px`);
		const newTheme = JSON.parse(JSON.stringify(currentTheme.value));

		newTheme["::selection"].background = colors.secondary;
		newTheme["::selection"].color = "#000";
		newTheme.p["text-align"] = textAlign;
		newTheme.p["line-height"] = lineHeight;
		changeTheme(newTheme);
	};

	const onRefresh = () => {
		console.log({ toc, section });
	};

	return { currentTheme, onClose, onReady, onRefresh };
};
