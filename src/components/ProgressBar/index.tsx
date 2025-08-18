import type { FC } from "react";
import { View, type ViewProps } from "react-native";
import styles from "./styles";

type _IProgressBar = ViewProps & {
	progress: number;
};

export const ProgressBar: FC<_IProgressBar> = ({ progress }) => (
	<View style={styles.progressBarContainer}>
		<View style={[styles.progressBar, { width: `${progress}%` }]} />
	</View>
);
