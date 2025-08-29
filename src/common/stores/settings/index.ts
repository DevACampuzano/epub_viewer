import { Themes } from "@epubjs-react-native/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export const themes: ITheme[] = [
	{
		label: "Claro",
		description: "Fondo blanco con texto negro",
		value: Themes.LIGHT,
	},
	{
		label: "Oscuro",
		description: "Fondo negro con texto blanco",
		value: Themes.DARK,
	},
	{
		label: "Sepia",
		description: "Fondo marrón claro con texto oscuro",
		value: Themes.SEPIA,
	},
];

const inicialState: StateSettings = {
	currentTheme: themes[0],
	fontSize: 16,
	textAlign: "left",
	lineHeight: 1.3,
	currentFlow: "paginated",
	paddingHorizontal: 0,
	notes: [],
	orderBy: "createdAt",
	design: "grid",
};

const storeAPI: StateCreator<_ISettingsStore> = (set) => ({
	...inicialState,
	setCurrentTheme: (theme) =>
		set((state) => ({ ...state, currentTheme: theme })),
	setFontSize: (size) => set((state) => ({ ...state, fontSize: size })),
	setTextAlign: (align) => set((state) => ({ ...state, textAlign: align })),
	setLineHeight: (lineHeight) => set((state) => ({ ...state, lineHeight })),
	setFlow: (flow) => set((state) => ({ ...state, currentFlow: flow })),
	setNotes: (notes) => set((state) => ({ ...state, notes })),
	setPaddingHorizontal: (padding) =>
		set((state) => ({ ...state, paddingHorizontal: padding })),
	setOrderBy: (orderBy) => set(() => ({ orderBy })),
	setDesign: (design) => set(() => ({ design })),
});

export const useSettingStore = create<_ISettingsStore>()(
	devtools(
		persist(immer(storeAPI), {
			skipHydration: true,
			name: "settings",
			storage: createJSONStorage(() => AsyncStorage),
		}),
	),
);
