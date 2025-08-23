import * as RNFS from "@dr.pogodin/react-native-fs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useForm } from "@/hooks";
import { useBookStore } from "@/stores";

type Props = {
	id: string;
	file: string;
};
export default (
	{ id, file }: Props,
	navigation: NativeStackNavigationProp<_IRootStack, "book", undefined>,
) => {
	const book = useBookStore((state) =>
		state.books.find((book) => book.id === id),
	);
	const orderBy = useBookStore((state) => state.orderBy);
	const setOrderBy = useBookStore((state) => state.setOrderBy);
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

	const openBook = () => {
		console.log;
		updateBooks(id, {
			lastReading: Date.now(),
		});
		setOrderBy(orderBy);
		navigation.navigate("read", {
			id,
			file,
			currentPage: book?.currentPage,
			title: book?.title || "",
		});
	};
	return {
		onDeleteBook,
		updateBooks,
		markBookAsRead,
		...book,
		...form,
		onChange,
		resetForm,
		openBook,
	};
};
