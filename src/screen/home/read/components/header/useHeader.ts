import DeviceBrightness from "@adrianso/react-native-device-brightness";
import { useReader } from "@epubjs-react-native/core";
import { Realm, useQuery } from "@realm/react";
import { useCallback, useEffect, useState } from "react";
import { Animated, Platform, useAnimatedValue } from "react-native";
import { useDebounce } from "@/common/hooks";
import { Book } from "@/common/schemas";
import { useSettingStore } from "@/common/stores";

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

export default (id: string) => {
	const [openMenu, setOpenMenu] = useState(false);
	const [brightness, setBrightness] = useState(0);
	const flow = useSettingStore((state) => state.currentFlow);
	const changeFlow = useSettingStore((state) => state.setFlow);
	const [isOpenDrawer, setIsOpenDrawer] = useState(false);
	const [drawerOption, setDrawerOption] = useState<_IDrawerOption>(
		drawerOptions[0],
	);
	const [isBookmarked, setIsBookmarked] = useState(false);
	const {
		goToLocation,
		search: searchText,
		searchResults,
		addBookmark,
		removeBookmark,
		getCurrentLocation,
		removeAnnotationByCfi,
		section,
	} = useReader();
	const book = useQuery(Book).filtered(
		`_id == $0`,
		new Realm.BSON.ObjectId(id),
	)[0];
	const position = useAnimatedValue(-300);
	const [search, setSearch] = useState("");

	const positionDrawerIn = useCallback(() => {
		Animated.timing(position, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start();
	}, [position]);

	const debouncedRefetch = useDebounce(() => {
		searchText(search, 1, 20);
	}, 500);

	const handleChangeSearchText = useCallback(
		(text: string) => {
			setSearch(text);
			debouncedRefetch();
		},
		[debouncedRefetch],
	);

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

	const handleChangeBookmark = () => {
		const location = getCurrentLocation();

		if (!location) return;

		const bookmark = book.bookmarks.find(
			(item) =>
				item.location.start.cfi === location?.start.cfi &&
				item.location.end.cfi === location?.end.cfi,
		);
		if (bookmark) {
			removeBookmark(bookmark);
		} else {
			addBookmark(location);
		}
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

	useEffect(() => {
		const location = getCurrentLocation();
		if (!location) return;
		const bookMarked = book.bookmarks.find(
			(item) =>
				item.location.start.cfi === location.start.cfi &&
				item.location.end.cfi === location.end.cfi,
		);
		setIsBookmarked(Boolean(bookMarked));
	}, [book, getCurrentLocation]);

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
		search,
		handleChangeSearchText,
		searchResults: searchResults.results,
		handleChangeBookmark,
		bookmarks: book.bookmarks || [],
		isBookmarked,
		removeAnnotationByCfi,
		section,
	};
};
