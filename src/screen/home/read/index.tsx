import { Reader } from "@epubjs-react-native/core";
import { useFileSystem } from "@epubjs-react-native/file-system";
import Clipboard from "@react-native-clipboard/clipboard";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import { Linking, Platform, View } from "react-native";
import { Loading } from "@/components";
import { Header, Layout } from "./components";
import { Footer } from "./components/footer/index";
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
		position,
		singleTap,
		onPress,
		opacity,
		currentFlow,
		toc,
		addBookmarks,
		removeBookmarks,
		addAnnotation,
		notes,
		paddingHorizontal,
		updateAnnotations,
		updateBook,
		currentBook,
	} = useRead(id, navigation);

	return (
		<Layout singleTap={Platform.OS === "ios" ? onPress : singleTap}>
			<Header
				currentTheme={currentTheme}
				onClose={onClose}
				title={title}
				opacity={opacity}
				toc={toc}
				id={id}
				annotations={currentBook?.annotations || []}
			/>
			<View
				style={{
					flex: 1,
					paddingHorizontal,
					backgroundColor: currentTheme.value.body.background,
				}}
			>
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
					onAddBookmark={(bookmark) => {
						addBookmarks(id, bookmark);
					}}
					onRemoveBookmark={(bookmark) => {
						removeBookmarks(id, bookmark.id);
					}}
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
					initialAnnotations={currentBook?.annotations}
					initialLocation={currentPage}
					defaultTheme={currentTheme.value}
					flow={currentFlow}
					onPressExternalLink={(url) => {
						Linking.openURL(url);
					}}
					allowPopups
					onFinish={() => {
						updateBook(id, { progress: 100, finalDate: Date.now() });
					}}
					onChangeAnnotations={(annotations) => {
						updateAnnotations(id, annotations);
					}}
					menuItems={[
						{
							label: "Copiar",
							action(_cfiRange: string, text: string) {
								Clipboard.setString(text);
								return true;
							},
						},
						...notes.map((note) => ({
							label: note.label,
							action: (cfiRange: string) => {
								addAnnotation(note.style, cfiRange, undefined, {
									color: note.color,
									thickness: 3,
									opacity: 1,
								});
								return true;
							},
						})),
					]}
				/>
			</View>
			<Footer position={position} currentTheme={currentTheme} />
		</Layout>
	);
};
