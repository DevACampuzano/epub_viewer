import * as RNFS from "@dr.pogodin/react-native-fs";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Realm, useQuery, useRealm } from "@realm/react";
import { useForm } from "@/common/hooks";
import { Book } from "@/common/schemas";
import { useSettingStore } from "@/common/stores";

export default (
	id: string,
	navigation: NativeStackNavigationProp<_IRootStack, "book", undefined>,
) => {
	const realm = useRealm();
	const book = useQuery(Book).filtered(
		`_id == $0`,
		new Realm.BSON.ObjectId(id),
	)[0];
	const categoryList = useSettingStore((state) => state.categories);
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
				const book = realm.objectForPrimaryKey<Book>(
					"Book",
					new Realm.BSON.ObjectId(id),
				);
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
			const book = realm.objectForPrimaryKey<Book>(
				Book,
				new Realm.BSON.ObjectId(id),
			);
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
			const book = realm.objectForPrimaryKey<Book>(
				Book,
				new Realm.BSON.ObjectId(id),
			);
			if (book) {
				book.lastReading = Date.now();
			}
		});
		navigation.navigate("read", {
			id,
			file: book.file,
			currentPage: book.currentPage,
			title: book.title || "",
		});
	};

	const updateBooks = (updateBook: Partial<_IBook>) => {
		realm.write(() => {
			const book = realm.objectForPrimaryKey<Book>(
				Book,
				new Realm.BSON.ObjectId(id),
			);
			if (book) {
				for (const key in updateBook) {
					// @ts-expect-error
					book[key] = updateBook[key];
				}
			}
		});
	};

	const handleCategoryPress = (category: string) => {
		realm.write(() => {
			const book = realm.objectForPrimaryKey<Book>(
				Book,
				new Realm.BSON.ObjectId(id),
			);
			if (!book) {
				return;
			}

			if (book.categories.includes(category)) {
				book.categories = book.categories.filter((c) => c !== category);
			} else {
				book.categories.push(category);
			}
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
		categoryList,
		handleCategoryPress,
	};
};
