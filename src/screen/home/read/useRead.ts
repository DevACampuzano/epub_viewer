import { useReader } from "@epubjs-react-native/core";
import { usePreventRemove } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { useBookStore, useSettingStore } from "@/stores";

export default (
	id: string,
	navigation: NativeStackNavigationProp<_IRootStack, "read", undefined>,
) => {
	const [exit, setExit] = useState(false);
	const updateBook = useBookStore((state) => state.updateBook);
	const currentTheme = useSettingStore((state) => state.currentTheme);
	const { currentLocation, progress, totalLocations } = useReader();

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

	return { currentTheme, onClose };
};
