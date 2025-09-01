import {
	type Annotation,
	type Bookmark,
	useReader,
} from "@epubjs-react-native/core";
import { usePreventRemove } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Realm, useQuery, useRealm } from "@realm/react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
	Animated,
	AppState,
	type AppStateStatus,
	useAnimatedValue,
} from "react-native";
import { Gesture } from "react-native-gesture-handler";
import KeepAwake from "react-native-keep-awake";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Book } from "@/common/schemas";
import { useSettingStore } from "@/common/stores";
import { colors } from "@/common/theme";

export default (
	id: string,
	navigation: NativeStackNavigationProp<_IRootStack, "read", undefined>,
) => {
	const [exit, setExit] = useState(false);
	const currentBook = useQuery(Book).filtered(
		`_id == $0`,
		new Realm.BSON.ObjectId(id),
	)[0];
	const realm = useRealm();

	const currentTheme = useSettingStore((state) => state.currentTheme);
	const fontSize = useSettingStore((state) => state.fontSize);
	const textAlign = useSettingStore((state) => state.textAlign);
	const lineHeight = useSettingStore((state) => state.lineHeight);
	const currentFlow = useSettingStore((state) => state.currentFlow);
	const paddingHorizontal = useSettingStore((state) => state.paddingHorizontal);
	const notes = useSettingStore((state) => state.notes);
	const {
		changeFontSize,
		changeTheme,
		changeFlow,
		getLocations,
		getCurrentLocation,
		toc,
		addAnnotation,
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
		.numberOfTaps(2)
		.runOnJS(true)
		.maxDuration(250)
		.onStart(() => {
			onPress();
		});

	const handleSaveProgress = useCallback(() => {
		const currentLocation = getCurrentLocation();

		const locations = JSON.parse(getLocations().toString()) as string[];

		if (!currentLocation) {
			console.log("No current location found");
			return;
		}

		const progressPercentage = currentLocation.start.percentage * 100;

		realm.write(() => {
			try {
				const book = realm.objectForPrimaryKey<Book>(Book, new Realm.BSON.ObjectId(id));

				if (book) {
					book.currentPage = currentLocation?.start.cfi;
					book.progress =
						progressPercentage > book.progress
							? progressPercentage
							: book.progress;
					book.totalPages = locations.length;
					if (currentLocation.atEnd) {
						book.finalDate = Date.now();
					}
				}
			} catch (error) {
				console.log("Error updating book progress:", error);
			}
		});
		setExit(true);
	}, [getCurrentLocation, getLocations, id, realm]);

	usePreventRemove(!exit, () => {
		handleSaveProgress();
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
		newTheme.a["text-decoration"] = "underline";
		newTheme.span.color = `${colors.primary} !important`;
		changeTheme(newTheme);
	};

	const handleAppStateChange = useCallback(
		async (nextAppState: AppStateStatus) => {
			if (nextAppState === "background" || nextAppState === "inactive") {
				try {
					await handleSaveProgress();
				} catch (error) {
					console.error("Error guardando datos:", error);
				}
			}
		},
		[handleSaveProgress],
	);

	const updateBookmarks = (action: "add" | "remove", bookmark: Bookmark) => {
		realm.write(() => {
			const book = realm.objectForPrimaryKey<Book>(Book, new Realm.BSON.ObjectId(id));
			if (book) {
				if (action === "add") {
					book.bookmarks.push(bookmark);
				} else {
					book.bookmarks = book.bookmarks.filter((b) => b.id !== bookmark.id);
				}
			}
		});
	};

	const updateAnnotations = (annotations: Annotation[]) => {
		realm.write(() => {
			const book = realm.objectForPrimaryKey<Book>(Book, new Realm.BSON.ObjectId(id));
			if (book) {
				book.annotations = annotations;
			}
		});
	};

	const onFinish = () => {
		realm.write(() => {
			const book = realm.objectForPrimaryKey<Book>(Book, new Realm.BSON.ObjectId(id));
			if (book) {
				book.progress = 100;
				book.finalDate = Date.now();
			}
		});
	};

	useEffect(() => {
		changeFlow(currentFlow);
	}, [currentFlow, changeFlow]);

	useEffect(() => {
		KeepAwake.activate();
		return () => {
			KeepAwake.deactivate();
		};
	}, []);

	useEffect(() => {
		const subscription = AppState.addEventListener(
			"change",
			handleAppStateChange,
		);

		return () => {
			subscription.remove();
		};
	}, [handleAppStateChange]);

	return {
		currentTheme,
		onClose,
		onReady,
		singleTap,
		position,
		onPress,
		opacity: fadeAnim,
		currentFlow,
		toc,
		currentBook,
		updateBookmarks,
		addAnnotation,
		notes,
		paddingHorizontal,
		updateAnnotations,
		onFinish,
	};
};
