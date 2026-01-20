type _PropsToast = {
	msg: string;
	show: boolean;
	icon?: "triangle-alert" | "octagon-alert" | "circle-check" | "info";
	callbackEnd: () => void;
};
