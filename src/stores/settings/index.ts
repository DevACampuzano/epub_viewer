import { Themes } from "@epubjs-react-native/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const themes: ITheme[] = [
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
	themes,
	currentTheme: themes[0],
};

const storeAPI: StateCreator<_ISettingsStore> = (set) => ({
	...inicialState,
	setCurrentTheme: (theme) => set({ currentTheme: theme }),
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
