import type { FC } from "react";
import { StyleSheet, View } from "react-native";

type DividerProps = React.ComponentProps<typeof View> & {
	vertical?: boolean;
};
export const Divider: FC<DividerProps> = ({ vertical, ...props }) => (
	<View
		{...props}
		style={[
			style.divider,
			props.style,
			vertical
				? { borderLeftWidth: 1, borderTopWidth: 0, height: "100%" }
				: {
						borderLeftWidth: 0,
						borderTopWidth: 1,
						width: "100%",
					},
		]}
	/>
);

const style = StyleSheet.create({
	divider: {
		borderColor: "#E5E5EA",
	},
});
