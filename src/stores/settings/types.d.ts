type ITheme = {
	label: string;
	description: string;
	value: {
		[key: string]: {
			[key: string]: string;
		};
	};
};

interface StateSettings {
	themes: ITheme[];
	currentTheme: ITheme;
}

interface ActionsSettings {
	setCurrentTheme: (theme: ITheme) => void;
}

type _ISettingsStore = StateSettings & ActionsSettings;
