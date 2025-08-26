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

type Note = {
	id: string;
	label: string;
	color: ColorValue;
	style: "highlight" | "underline";
};

type Flow =
	| "auto"
	| "paginated"
	| "scrolled"
	| "scrolled-doc"
	| "scrolled-continuous";

interface StateSettings {
	currentTheme: ITheme;
	fontSize: number;
	textAlign: TextAlign;
	lineHeight: number;
	currentFlow: Flow;
	paddingHorizontal: number;
	notes: Note[];
}

interface ActionsSettings {
	setCurrentTheme: (theme: ITheme) => void;
	setFontSize: (size: number) => void;
	setTextAlign: (align: TextAlign) => void;
	setLineHeight: (lineHeight: number) => void;
	setFlow: (flow: Flow) => void;
	setNotes: (notes: Note[]) => void;
	setPaddingHorizontal: (padding: number) => void;
}

type _ISettingsStore = StateSettings & ActionsSettings;
