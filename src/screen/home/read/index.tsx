import { Reader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import Icon from "@react-native-vector-icons/lucide";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useRead from "./useRead";

export const Read: FC<NativeStackScreenProps<_IRootStack, "read">> = ({
	route,
	navigation,
}) => {
	const { file, id, currentPage } = route.params;
	const { bottom } = useSafeAreaInsets();
	const { onClose, currentTheme } = useRead(id, navigation);

	return (
		<View
			style={[
				style.root,
				{
					paddingBottom: bottom || 30,
					backgroundColor: currentTheme.value.body.background,
				},
			]}
		>
			<TouchableOpacity style={style.backButton} onPress={onClose}>
				<Icon
					name="chevron-left"
					size={30}
					color={currentTheme.value.p.color.split(" ")[0]}
				/>
			</TouchableOpacity>

			<Reader
				src={file}
				fileSystem={useFileSystem}
				// fullsize
				waitForLocationsReady={true}
				keepScrollOffsetOnLocationChange={false}
				onDisplayError={(error) => {
					console.error("Reader display error:", error);
				}}
				initialLocation={currentPage}
				// manager="continuous"
				defaultTheme={currentTheme.value}
				flow="scrolled"
			/>
		</View>
	);
};

const style = StyleSheet.create({
	root: { flex: 1 },
	backButton: {
		position: "absolute",
		top: 10,
		left: 10,
		zIndex: 10,
	},
});
