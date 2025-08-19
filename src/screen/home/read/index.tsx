import { Reader, useReader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import Icon from "@react-native-vector-icons/lucide";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import { Dimensions, TouchableOpacity, View } from "react-native";
import { useBookStore } from "@/stores";

export const Read: FC<NativeStackScreenProps<_IRootStack, "read">> = ({
	route,
	navigation,
}) => {
	const { file, id } = route.params;
	const { goNext, goPrevious } = useReader();
	const book = useBookStore((state) =>
		state.books.find((book) => book.id === id),
	);
	const updateBook = useBookStore((state) => state.updateBook);
	const { width, height } = Dimensions.get("window");

	return (
		<View style={{ flex: 1 }}>
			<TouchableOpacity
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 10,
				}}
				onPress={() => navigation.goBack()}
			>
				<Icon name="chevron-left" size={30} color="#000" />
			</TouchableOpacity>

			<Reader
				src={file}
				fileSystem={useFileSystem}
				fullsize
				width={width}
				height={height}
				onLocationChange={(totalLocations, currentLocation, progress) => {
					console.log("Location changed", {
						totalLocations,
						currentLocation,
						progress,
					});
					if (currentLocation) {
						updateBook(id, {
							currentPage: currentLocation.start.cfi,
							totalPages: totalLocations,
							progress,
						});
					}
				}}
				onSwipeDown={() => goPrevious()}
				onSwipeUp={() => goNext()}
				initialLocation={book?.currentPage}
				waitForLocationsReady
				keepScrollOffsetOnLocationChange
			/>
		</View>
	);
};
