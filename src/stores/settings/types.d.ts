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

type Flow =
	| "auto"
	| "paginated"
	| "scrolled"
	| "scrolled-doc"
	| "scrolled-continuous";

interface StateSettings {
	themes: ITheme[];
	currentTheme: ITheme;
	fontSize: number;
	textAlign: TextAlign;
	lineHeight: number;
	currentFlow: Flow;
}

interface ActionsSettings {
	setCurrentTheme: (theme: ITheme) => void;
	setFontSize: (size: number) => void;
	setTextAlign: (align: TextAlign) => void;
	setLineHeight: (lineHeight: number) => void;
	setFlow: (flow: Flow) => void;
}

type _ISettingsStore = StateSettings & ActionsSettings;
