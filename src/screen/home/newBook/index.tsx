import { pick } from "@react-native-documents/picker";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ButtonBack, InputFile, Text } from "@/components";
import { useForm } from "@/hooks";

interface ISelectedFile {
	uri: string;
	name?: string | null;
	size?: number | null;
}

interface IForm {
	file: ISelectedFile | null;
}

export const NewBook: FC<NativeStackScreenProps<_IRootStack, "newBook">> = ({
	navigation,
}) => {
	const { file, onChange } = useForm<IForm, never>({
		file: null,
	});
	const handleSelectFile = async () => {
		const [result] = await pick({
			mode: "open",
			allowMultiSelection: false,
			type: ["org.idpf.epub-container", "application/epub+zip"],
		});
		if (result) {
			console.log(result);
			onChange(result, "file");
		}
	};
	const bytesToMB = (bytes: number): number => {
		return Math.round((bytes / (1024 * 1024)) * 100) / 100;
	};
	return (
		<View style={style.root}>
			<ButtonBack label="Regresar" onPress={() => navigation.goBack()} />
			<Text style={style.title}>Agregar Libro</Text>
			<Text style={style.subtitle}>
				Sube un archivo EPUB a tu biblioteca personal
			</Text>
			<InputFile
				label={file?.name || "Seleccionar archivo"}
				size={file?.size ? bytesToMB(file.size) : undefined}
				onPress={handleSelectFile}
			/>
		</View>
	);
};

const style = StyleSheet.create({
	root: {
		flex: 1,
		paddingVertical: 10,
		gap: 10,
	},
	title: {
		fontSize: 20,
		fontWeight: "bold",
		marginTop: 10,
	},
	subtitle: {
		fontSize: 16,
		marginBottom: 10,
	},
});
