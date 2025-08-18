import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styles from "./styles";

type _DividerProps = ViewProps & {
	vertical?: boolean;
};

export const Divider: FC<_DividerProps> = ({ vertical, ...props }) => (
	<View
		{...props}
		style={[
			styles.divider,
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
