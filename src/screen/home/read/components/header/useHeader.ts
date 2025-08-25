import DeviceBrightness from "@adrianso/react-native-device-brightness";
import { useReader } from "@epubjs-react-native/core";
import { useCallback, useEffect, useState } from "react";
import { Animated, Platform, useAnimatedValue } from "react-native";
import { useSettingStore } from "@/stores";

const flowOptions: _IFlowOption[] = [
	{ value: "paginated", label: "Paginado", icon: "book-open" },
	{ value: "scrolled", label: "Desplazado", icon: "gallery-vertical" },
	{
		value: "scrolled-doc",
		label: "Desplazado documento",
		icon: "gallery-vertical",
	},
	{
		value: "scrolled-continuous",
		label: "Desplazado continuo",
		icon: "gallery-vertical",
	},
];

const drawerOptions: _IDrawerOption[] = [
	{ value: "chapters", label: "Capítulos", icon: "list", title: "Índice" },
	{
		value: "search",
		label: "Buscar",
		icon: "search",
		title: "Buscar en el libro",
	},
	{
		value: "bookmarks",
		label: "Marcadores",
		icon: "bookmark",
		title: "Páginas marcadas",
	},
	{ value: "notes", label: "Notas", icon: "file-text", title: "Notas" },
];

export default () => {
	const [openMenu, setOpenMenu] = useState(false);
	const [brightness, setBrightness] = useState(0);
	const flow = useSettingStore((state) => state.currentFlow);
	const changeFlow = useSettingStore((state) => state.setFlow);
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [drawerOption, setDrawerOption] = useState<_IDrawerOption>(
		drawerOptions[0],
	);
	const { goToLocation } = useReader();
	const position = useAnimatedValue(-300);

	const positionDrawerIn = useCallback(() => {
		Animated.timing(position, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [position]);

	const positionDrawerOut = () => {
		Animated.timing(position, {
			toValue: -300,
			duration: 500,
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (finished) {
				setIsOpenDrawer(false);
			}
		});
	};

	useEffect(() => {
		const data = async () => {
			const currentBrightness =
				Platform.OS === "android"
					? await DeviceBrightness.getSystemBrightnessLevel()
					: await DeviceBrightness.getBrightnessLevel();
			setBrightness(currentBrightness);
		};
		data();
	}, []);

	useEffect(() => {
		if (isOpenDrawer) {
			positionDrawerIn();
		}
	}, [isOpenDrawer, positionDrawerIn]);
	return {
		openMenu,
		setOpenMenu,
		brightness,
		setBrightness,
		flow,
		changeFlow,
		flowOptions,
		drawerOptions,
		isOpenDrawer,
		setIsOpenDrawer,
		drawerOption,
		setDrawerOption,
		goToLocation,
		positionDrawerOut,
		position,
	};
};
