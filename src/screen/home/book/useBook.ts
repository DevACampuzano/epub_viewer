import * as RNFS from "@dr.pogodin/react-native-fs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useQuery, useRealm } from "@realm/react";
import { useForm } from "@/common/hooks";
import { Book } from "@/common/schemas";

type Props = {
	id: Realm.BSON.ObjectId;
	file: string;
};
export default (
	{ id, file }: Props,
	navigation: NativeStackNavigationProp<_IRootStack, "book", undefined>,
) => {
	const realm = useRealm();
	const book = useQuery(Book).filtered(`_id == $0`, id)[0];

	const { form, onChange, resetForm } = useForm({
		activeEdit: false,
		text: book?.opinion || "",
	});

	const onDeleteBook = async () => {
		try {
			if (!book) {
				return;
			}
			await RNFS.unlink(book.file);
		} catch (error) {
			console.log("Error deleting file:", error);
		} finally {
			realm.write(() => {
				const book = realm.objectForPrimaryKey<Book>('Book', id);
				if (book) {
					realm.delete(book);
				}
			});
			navigation.goBack();
		}
	};

	const markBookAsRead = () => {
		if (!book) {
			return;
		}
		realm.write(() => {
			const book = realm.objectForPrimaryKey<Book>(Book, id);
			const now = Date.now();
			if (book) {
				book.progress = 100;
				book.finalDate = now;
				book.lastReading = now;
			}
		});
	};

	const openBook = () => {

		realm.write(() => {
			const book = realm.objectForPrimaryKey<Book>(Book, id);
			if (book) {
				book.lastReading = Date.now();
			}
		});
		navigation.navigate("read", {
			id,
			file,
			currentPage: book?.currentPage,
			title: book?.title || "",
		});
	};

	const updateBooks = (updateBook: Partial<_IBook>) => {
		realm.write(() => {
			const book = realm.objectForPrimaryKey<Book>(Book, id);
			if (book) {
				for (const key in updateBook) {
					// @ts-expect-error
					book[key] = updateBook[key];
				}
			}
		});

	}

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
