type _IRootTabs = {
	list: undefined;
	settings: undefined;
};

type _IRootStack = {
	home: undefined;
	book: {
		id: string;
	};
	newBook: undefined;
	searchBooks: undefined;
	read: {
		id: string;
		file: string;
		title: string;
		currentPage?: string;
	};
};

type _ISelectedFile = {
	uri: string;
	name?: string | null;
	size?: number | null;
}

type _IBook = {
	_id: Realm.BSON.ObjectId;
	file: string;
	image: string;
	title: string;
	author: string;
	description?: string;
	language?: string;
	publisher?: string;
	rights?: string;
	qualification?: number;
	opinion?: string;
	currentPage?: string;
	totalPages: number;
	progress: number;
	createdAt: number;
	lastReading: number;
	bookmarks: import("@epubjs-react-native/core").Bookmark[];
	annotations: import("@epubjs-react-native/core").Annotation[];
	finalDate?: number;
	categories: string[];
}

type _Toc = import("@epubjs-react-native/core").Section[];
