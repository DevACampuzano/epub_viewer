import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface IBookStore {
	books: _IBook[];
	filterBooks: (query: string) => _IBook[];
	addBook: (book: _IBook) => void;
	markBookAsRead: (id: string) => void;
	removeBook: (id: string) => void;
	updateBook: (id: string, book: Partial<_IBook>) => void;
}

const storeAPI: StateCreator<IBookStore> = (set, get) => ({
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
});

export const useBookStore = create<IBookStore>()(
	devtools(
		persist(immer(storeAPI), {
			skipHydration: true,
			name: "data",
			storage: createJSONStorage(() => AsyncStorage),
		}),
	),
);
