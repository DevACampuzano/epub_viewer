interface _IBookStore {
	books: _IBook[];
	filterBooks: (query: string) => _IBook[];
	addBook: (book: _IBook) => void;
	markBookAsRead: (id: string) => void;
	removeBook: (id: string) => void;
	updateBook: (id: string, book: Partial<_IBook>) => void;
	calculateOverallProgress: () => number;
}
