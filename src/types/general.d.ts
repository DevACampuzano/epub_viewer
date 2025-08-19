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
	book: {
		id: string;
	};
	newBook: undefined;
	read: {
		id: string;
	};
};

interface ISelectedFile {
	uri: string;
	name?: string | null;
	size?: number | null;
}

interface _IFormNewBook {
	file: ISelectedFile | null;
	image: string;
	title: string;
	author: string;
	description: string;
	language: string;
	publisher: string;
	rights: string;
}

interface _IBook {
	id: string; //
	file: string;
	image: string; //
	title: string; //
	author: string; //
	description?: string; //
	language?: string; //
	publisher?: string; //
	rights?: string; //
	qualification?: number; //
	opinion?: string;
	currentPage?: string;
	indexCurrentPage?: number;
	totalPages: number; //
	createdAt: number; //
	finalDate?: number;
}
