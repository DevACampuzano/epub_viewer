type ITheme = {
	label: string;
	description: string;
	value: {
		[key: string]: {
			[key: string]: string;
		};
	};
};

type TextAlign = "left" | "center" | "right" | "justify";
interface StateSettings {
	themes: ITheme[];
	currentTheme: ITheme;
	fontSize: number;
	textAlign: TextAlign;
	lineHeight: number;
}

interface ActionsSettings {
	setCurrentTheme: (theme: ITheme) => void;
	setFontSize: (size: number) => void;
	setTextAlign: (align: TextAlign) => void;
	setLineHeight: (lineHeight: number) => void;
}

type _ISettingsStore = StateSettings & ActionsSettings;
