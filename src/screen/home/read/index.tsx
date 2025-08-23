import { Reader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import Icon from "@react-native-vector-icons/lucide";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import { Linking, Platform, TouchableOpacity } from "react-native";
import { Loading } from "@/components";
import { Header, Layout } from "./components";
import { Footer } from "./components/footer/index";
import style from "./styles";
import useRead from "./useRead";

export const Read: FC<NativeStackScreenProps<_IRootStack, "read">> = ({
	route,
	navigation,
}) => {
	const { file, id, currentPage, title } = route.params;
	const {
		onClose,
		currentTheme,
		onReady,
		onRefresh,
		position,
		singleTap,
		onPress,
		opacity,
		currentFlow,
	} = useRead(id, navigation);

	return (
		<Layout singleTap={Platform.OS === "ios" ? onPress : singleTap}>
			<Header
				currentTheme={currentTheme}
				onClose={onClose}
				title={title}
				opacity={opacity}
			/>
			{__DEV__ && (
				<TouchableOpacity style={style.refreshButton} onPress={onRefresh}>
					<Icon
						name="refresh-ccw"
						size={30}
						color={currentTheme.value.p.color.split(" ")[0]}
					/>
				</TouchableOpacity>
			)}

			<Reader
				src={file}
				fileSystem={useFileSystem}
				waitForLocationsReady
				keepScrollOffsetOnLocationChange={false}
				renderLoadingFileComponent={() => (
					<Loading
						label="Cargando..."
						color={currentTheme.value.p.color.split(" ")[0]}
					/>
				)}
				onReady={onReady}
				enableSelection
				renderOpeningBookComponent={() => (
					<Loading
						label="Abriendo..."
						color={currentTheme.value.p.color.split(" ")[0]}
						containerProps={{
							style: {
								backgroundColor: currentTheme.value.body.background,
							},
						}}
					/>
				)}
				onDisplayError={(error) => {
					console.error("Reader display error:", error);
				}}
				onSelected={(selection, cfRange) => {
					console.log("Selected text:", selection);
					console.log("CF Range:", cfRange);
					// positionIn();
				}}
				initialLocation={currentPage}
				// manager="continuous"
				defaultTheme={currentTheme.value}
				flow={currentFlow}
				onPressExternalLink={(url) => {
					Linking.openURL(url);
				}}
			/>

			<Footer position={position} />
		</Layout>
	);
};
