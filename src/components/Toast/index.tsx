import Icon from "@react-native-vector-icons/lucide";
import React, {
	type ComponentProps,
	type FC,
	useCallback,
	useState,
} from "react";
import { Animated, Text, useAnimatedValue, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import styles from "./styles";

interface PropsToast {
	msg: string;
	show: boolean;
	icon?: "triangle-alert" | "octagon-alert" | "circle-check" | "info";
	callbackEnd: () => void;
}

export const Toast: FC<PropsToast> = ({
	msg = "",
	show,
	callbackEnd,
	icon = "info",
}) => {
	const fadeAnim = useAnimatedValue(0);
	const { top } = useSafeAreaInsets();
	const [zIndex, setZIndex] = useState(0);

	const fadeOut = useCallback(() => {
		Animated.timing(fadeAnim, {
			toValue: 0,
			duration: 500,
			useNativeDriver: true,
		}).start(({ finished }) => {
			if (finished) {
				setZIndex(0);
				callbackEnd();
			}
		});
	}, [fadeAnim, callbackEnd]);

	const fadeIn = useCallback(() => {
		setZIndex(10); // Much higher zIndex for modal compatibility
		Animated.timing(fadeAnim, {
			toValue: 1,
			duration: 500,
			useNativeDriver: true,
		}).start();

		setTimeout(() => {
			fadeOut();
		}, 1500);
	}, [fadeAnim, fadeOut]);

	React.useEffect(() => {
		if (show) fadeIn();
	}, [show, fadeIn]);

	return (
		<Animated.View
			style={[
				styles.container,
				{
					top: top + 10,
					zIndex,
					opacity: fadeAnim,
				},
			]}
		>
			<View style={styles.textContainer}>
				<Icon
					name={icon as ComponentProps<typeof Icon>["name"]}
					size={20}
					color={
						icon === "octagon-alert"
							? "#FF6B35"
							: icon === "circle-check"
								? "#4CAF50"
								: icon === "info"
									? "#2196F3"
									: icon === "triangle-alert"
										? "#ffe735ff"
										: "#000"
					}
				/>
				<Text>{msg}</Text>
			</View>
		</Animated.View>
	);
};
