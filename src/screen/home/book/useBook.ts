import * as RNFS from "@dr.pogodin/react-native-fs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm } from "@/hooks";
import { useBookStore } from "@/stores";

export default (
	id: string,
	navigation: NativeStackNavigationProp<_IRootStack, "book", undefined>,
) => {
	const book = useBookStore((state) =>
		state.books.find((book) => book.id === id),
	);
	const { form, onChange, resetForm } = useForm({
		activeEdit: false,
		text: book?.opinion || "",
	});

	const markBookAsRead = useBookStore((state) => state.markBookAsRead);

	const updateBooks = useBookStore((state) => state.updateBook);

	const deleteBook = useBookStore((state) => state.removeBook);

	const onDeleteBook = async () => {
		try {
			if (!book) {
				return;
			}
			await RNFS.unlink(book.file);
		} catch (error) {
			console.log("Error deleting file:", error);
		} finally {
			deleteBook(id);
			navigation.goBack();
		}
	};
	return {
		onDeleteBook,
		updateBooks,
		markBookAsRead,
		...book,
		...form,
		onChange,
		resetForm,
	};
};
