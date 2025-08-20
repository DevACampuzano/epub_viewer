import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const storeAPI: StateCreator<_IBookStore> = (set, get) => ({
	books: [],
	filterBooks: (query) =>
		get().books.filter((book) =>
			book.title.toLowerCase().includes(query.toLowerCase()),
		),
	markBookAsRead: (id) =>
		set((state) => ({
			books: state.books.map((book) =>
				book.id === id
					? { ...book, finalDate: Date.now(), progress: 100 }
					: book,
			),
		})),
	addBook: (book) => set((state) => ({ books: [...state.books, book] })),
	removeBook: (id) =>
		set((state) => ({ books: state.books.filter((book) => book.id !== id) })),
	updateBook: (id, book) =>
		set((state) => ({
			books: state.books.map((b) => (b.id === id ? { ...b, ...book } : b)),
		})),
	calculateOverallProgress: () => {
		const books = get().books;
		if (books.length === 0) return 0;

		const totalProgress = books.reduce(
			(acc, book) => acc + (book.progress || 0),
			0,
		);
		return totalProgress / books.length;
	},
});

export const useBookStore = create<_IBookStore>()(
	devtools(
		persist(immer(storeAPI), {
			skipHydration: true,
			name: "data",
			storage: createJSONStorage(() => AsyncStorage),
		}),
	),
);
