import { Divider, Text } from "@components/";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { FC } from "react";
import { FlatList, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button } from "../../../components/Button/index";
import Card from "./components/card";
import style from "./styles";

const data = [
	{
		id: 1,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-book-cover-gLV2O3gpssmbez7nThaV0upytW5bYg.png",
		title: "Book Title 1",
		author: "Author 1",
		progress: 50,
		qualification: 4,
	},
	{
		id: 2,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-book-cover-gLV2O3gpssmbez7nThaV0upytW5bYg.png",
		title: "Book Title 2",
		author: "Author 2",
		progress: 75,
		qualification: 5,
	},
	{
		id: 3,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-book-cover-gLV2O3gpssmbez7nThaV0upytW5bYg.png",
		title: "Book Title 1",
		author: "Author 1",
		progress: 50,
		qualification: 4,
	},
	{
		id: 4,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-book-cover-gLV2O3gpssmbez7nThaV0upytW5bYg.png",
		title: "Book Title 2",
		author: "Author 2",
		progress: 75,
		qualification: 5,
	},
	{
		id: 5,
		image:
			"https://hebbkx1anhila5yf.public.blob.vercel-storage.com/attachments/gen-images/public/abstract-book-cover-gLV2O3gpssmbez7nThaV0upytW5bYg.png",
		title: "Book Title 1",
		author: "Author 1",
		progress: 50,
		qualification: 4,
	},
];
export const List: FC<NativeStackScreenProps<_IRootStack, "home">> = ({
	navigation,
}) => {
	const { bottom } = useSafeAreaInsets();

	return (
		<View style={style.root}>
			<View style={style.header}>
				<View style={{ gap: 10 }}>
					<Text style={style.title}>Mi Bliblioteca</Text>
					<Text>{data.length} Libro en tu colección</Text>
				</View>
				<Button
					label="Agregar"
					onPress={() => navigation.navigate("newBook")}
				/>
			</View>

			<Divider style={{ marginVertical: 10 }} />
			<FlatList
				data={data}
				renderItem={({ item }) => (
					<Card
						image={item.image}
						title={item.title}
						author={item.author}
						progress={item.progress}
						qualification={item.qualification}
					/>
				)}
				key={2}
				style={{ width: "100%" }}
				contentContainerStyle={{
					gap: 20,
				}}
				columnWrapperStyle={{
					justifyContent: "space-between",
				}}
				numColumns={2}
				showsVerticalScrollIndicator={false}
				keyExtractor={(item) => item.id.toString()}
				ListFooterComponent={() => <View style={{ height: bottom + 55 }} />}
			/>
		</View>
	);
};
