type OrderBy =
	| "title"
	| "author"
	| "progress"
	| "lastReading"
	| "createdAt"
	| "qualification";

type Design = "grid" | "list";

interface _IBookState {
	books: _IBook[];
	orderBy: OrderBy;
	design: Design;
}

interface _IBookActions {
	filterBooks: (query: string) => _IBook[];
	addBook: (book: _IBook) => void;
	markBookAsRead: (id: string) => void;
	removeBook: (id: string) => void;
	updateBook: (id: string, book: Partial<_IBook>) => void;
	calculateOverallProgress: () => number;
	setOrderBy: (orderBy: OrderBy) => void;
	setDesign: (design: Design) => void;
}

type _IBookStore = _IBookState & _IBookActions;
