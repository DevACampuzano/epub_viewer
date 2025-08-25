type _IHeaderProps = {
	currentTheme: ITheme;
	title: string;
	onClose: () => void;
	opacity: Animated.Value;
	toc: _Toc;
	id: string;
};

type _IFlowOption = {
	value: Flow;
	label: string;
	icon: LucideIconName;
};

type IDrawerView = "notes" | "bookmarks" | "search" | "chapters";

type _IDrawerOption = {
	value: IDrawerView;
	label: string;
	icon: LucideIconName;
	title: string;
};
