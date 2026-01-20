type _IFormNewBook = {
	file: _ISelectedFile | null;
	image: string;
	title: string;
	author: string;
	description: string;
	language: string;
	publisher: string;
	rights: string;
	currentPage?: string;
	totalPages: number;
};

type _IMeta = {
	author: string;
	cover: string;
	description: string;
	language: string;
	publisher: string;
	rights: string;
	title: string;
};
