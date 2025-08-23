interface _IMeta {
	author: string;
	cover: string;
	description: string;
	language: string;
	publisher: string;
	rights: string;
	title: string;
}

type _IRootTabs = {
	list: undefined;
	settings: undefined;
};
type _IRootStack = {
	home: undefined;
	book: _IBook;
	newBook: undefined;
	read: {
		id: string;
		file: string;
		title: string;
		currentPage?: string;
	};
};

interface ISelectedFile {
	uri: string;
	name?: string | null;
	size?: number | null;
}

interface _IFormNewBook {
	id: string;
	file: ISelectedFile | null;
	image: string;
	title: string;
	author: string;
	description: string;
	language: string;
	publisher: string;
	rights: string;
	totalPages: number;
	progress: number;
}

interface _IBook {
	id: string;
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
	finalDate?: number;
}
