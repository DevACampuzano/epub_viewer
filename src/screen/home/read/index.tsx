import { Reader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import Icon from "@react-native-vector-icons/lucide";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Loading } from "@/components";
import style from "./styles";
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
				renderLoadingFileComponent={() => (
					<Loading
						label="Cargando..."
						color={currentTheme.value.p.color.split(" ")[0]}
					/>
				)}
				renderOpeningBookComponent={() => (
					<Loading
						label="Abriendo..."
						color={currentTheme.value.p.color.split(" ")[0]}
						containerProps={{
							style: { backgroundColor: currentTheme.value.body.background },
						}}
					/>
				)}
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
