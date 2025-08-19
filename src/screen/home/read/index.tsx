import { Reader, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import Icon from "@react-native-vector-icons/lucide";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import { TouchableOpacity, View } from "react-native";
import { useBookStore } from "@/stores";

export const Read: FC<NativeStackScreenProps<_IRootStack, "read">> = ({
	route,
	navigation,
}) => {
	const { file, id, currentPage } = route.params;
	const updateBook = useBookStore((state) => state.updateBook);
	const { currentLocation, progress, totalLocations } = useReader();
	const handleSaveProgress = () => {
		if (currentLocation) {
			updateBook(id, {
				currentPage: currentLocation.start.cfi,
				progress,
				totalPages: totalLocations,
			});
		}
	};

	return (
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 10,
				}}
				onPress={() => {
					handleSaveProgress();
					navigation.goBack();
				}}
			>
				<Icon name="chevron-left" size={30} color="#000" />
			</TouchableOpacity>

			<Reader
				src={file}
				onLocationChange={(total, current, progress) => {
					console.log("Location changed:", total, current, progress);
				}}
				fileSystem={useFileSystem}
				// fullsize
				waitForLocationsReady={true}
				keepScrollOffsetOnLocationChange={false}
				onDisplayError={(error) => {
					console.error("Reader display error:", error);
				}}
				initialLocation={currentPage}
				// manager="continuous"
				flow="scrolled"
			/>
		</View>
	);
};
