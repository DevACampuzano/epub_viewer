import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import { StyleSheet, View } from "react-native";
import { ButtonBack, InputFile, Text } from "@/components";

export const NewBook: FC<NativeStackScreenProps<_IRootStack, "newBook">> = ({
	navigation,
}) => {
	return (
		<View style={style.root}>
			<ButtonBack label="Regresar" onPress={() => navigation.goBack()} />
			<Text style={style.title}>Agregar Libro</Text>
			<Text style={style.subtitle}>
				Sube un archivo EPUB a tu biblioteca personal
			</Text>
			<InputFile label="Seleccionar archivo" />
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
