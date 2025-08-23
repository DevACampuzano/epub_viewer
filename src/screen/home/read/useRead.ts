import { useReader } from "@epubjs-react-native/core";
import { usePreventRemove } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useEffect, useRef, useState } from "react";
import { Animated, useAnimatedValue } from "react-native";
import { Gesture } from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useBookStore, useSettingStore } from "@/stores";
import { colors } from "@/theme";

export default (
	id: string,
	navigation: NativeStackNavigationProp<_IRootStack, "read", undefined>,
) => {
	const [exit, setExit] = useState(false);
	const updateBook = useBookStore((state) => state.updateBook);
	const currentProgress = useBookStore(
		(state) => state.books.find((b) => b.id === id)?.progress,
	);
	const currentTheme = useSettingStore((state) => state.currentTheme);
	const fontSize = useSettingStore((state) => state.fontSize);
	const textAlign = useSettingStore((state) => state.textAlign);
	const lineHeight = useSettingStore((state) => state.lineHeight);
	const currentFlow = useSettingStore((state) => state.currentFlow);
	const {
		currentLocation,
		totalLocations,
		changeFontSize,
		changeTheme,
		toc,
		section,
		changeFlow,
	} = useReader();

	const { bottom } = useSafeAreaInsets();

	const position = useAnimatedValue(85);
	const fadeAnim = useAnimatedValue(0);
	const idsetTimeoutFooter = useRef<number | null>(null);
	const idsetTimeoutHeader = useRef<number | null>(null);

	const positionFooterIn = () => {
		Animated.timing(position, {
			toValue: bottom ? bottom * -1 : 0,
			duration: 500,
			useNativeDriver: true,
		}).start((finished) => {
			if (finished) {
				idsetTimeoutFooter.current = setTimeout(() => {
					positionFooterOut();
				}, 3000);
			}
		});
	};

	const positionFooterOut = () => {
		Animated.timing(position, {
			toValue: 80,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	const fadeOut = () => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	};

	const fadeIn = () => {
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (finished) {
				idsetTimeoutHeader.current = setTimeout(() => {
					fadeOut();
				}, 3000);
			}
		});
	};

	const onPress = () => {
		if (idsetTimeoutFooter.current && idsetTimeoutHeader.current) {
			clearTimeout(idsetTimeoutFooter.current);
			clearTimeout(idsetTimeoutHeader.current);
			idsetTimeoutFooter.current = null;
			idsetTimeoutHeader.current = null;
			positionFooterOut();
			fadeOut();
			return;
		}
		positionFooterIn();
		fadeIn();
	};

	const singleTap = Gesture.Tap()
		.numberOfTaps(1)
		// .runOnJS(true)
		.maxDuration(250)
		.onStart(() => {
			onPress();
		});

	const handleSaveProgress = () => {
		if (currentLocation && currentProgress) {
			updateBook(id, {
				currentPage: currentLocation.start.cfi,
				progress:
					currentLocation.start.percentage > currentProgress
						? currentLocation.start.percentage
						: currentProgress,
				totalPages: totalLocations,
				finalDate:
					currentLocation.start.percentage === 100 ? Date.now() : undefined,
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

	useEffect(() => {
		changeFlow(currentFlow);
	}, [currentFlow, changeFlow]);

	return {
		currentTheme,
		onClose,
		onReady,
		onRefresh,
		singleTap,
		position,
		onPress,
		opacity: fadeAnim,
		currentFlow,
	};
};
