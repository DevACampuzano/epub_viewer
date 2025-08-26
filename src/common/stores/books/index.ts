import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, type StateCreator } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

const initialState: _IBookState = {
	books: [],
	orderBy: "createdAt",
	design: "grid",
};

const orderBooks = (orderBy: OrderBy, books: _IBook[]) => {
	let list = [...books];
	switch (orderBy) {
		case "title":
			list = list.sort((a, b) => b.title.localeCompare(a.title));
			break;
		case "author":
			list = list.sort((a, b) => b.author.localeCompare(a.author));
			break;
		case "progress":
			list = list.sort((a, b) => b.progress - a.progress);
			break;
		case "lastReading":
			list = list.sort((a, b) => b.lastReading - a.lastReading);
			break;
		case "createdAt":
			list = list.sort((a, b) => b.createdAt - a.createdAt);
			break;
		case "qualification":
			list = list.sort(
				(a, b) => (b?.qualification || 0) - (a?.qualification || 0),
			);
			break;
	}
	return list;
};

const storeAPI: StateCreator<_IBookStore> = (set, get) => ({
	...initialState,
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
	setOrderBy: (orderBy) => {
		const books = get().books;
		const orderedBooks = orderBooks(orderBy, books);

		set(() => ({ orderBy, books: orderedBooks }));
	},
	setDesign: (design) => {
		set(() => ({ design }));
	},
	addBookmark: (id, bookmark) => {
		set((state) => {
			const book = state.books.find((b) => b.id === id);
			if (!book) return state;

			return {
				...state,
				books: state.books.map((b) =>
					b.id === id ? { ...b, bookmarks: [...b.bookmarks, bookmark] } : b,
				),
			};
		});
	},
	removeBookmark: (id, bookmarkId) => {
		set((state) => {
			const book = state.books.find((b) => b.id === id);
			if (!book) return state;

			return {
				...state,
				books: state.books.map((b) =>
					b.id === id
						? {
								...b,
								bookmarks: b.bookmarks.filter((b) => b.id !== bookmarkId),
							}
						: b,
				),
			};
		});
	},
	updateAnnotations: (id, annotations) => {
		set((state) => {
			const book = state.books.find((b) => b.id === id);
			if (!book) return state;

			return {
				...state,
				books: state.books.map((b) =>
					b.id === id ? { ...b, annotations } : b,
				),
			};
		});
	},
	addBooks: (books) => {
		set((state) => ({ ...state, books: [...state.books, ...books] }));
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
