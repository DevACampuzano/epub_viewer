import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styles from "./styles";

type _IProgressBar = ViewProps & {
	progress: number;
	progressProps?: ViewProps;
};

export const ProgressBar: FC<_IProgressBar> = ({
	progress,
	progressProps,
	...props
}) => (
	<View {...props} style={[styles.progressBarContainer, props?.style]}>
		<View
			{...progressProps}
			style={[
				styles.progressBar,
				{ width: `${progress}%` },
				progressProps?.style,
			]}
		/>
	</View>
);
