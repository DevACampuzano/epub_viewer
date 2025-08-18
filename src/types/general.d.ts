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
}
type _IRootStack = {
    home: undefined;
    book: {
        id:string
    };
    newBook: undefined;
    read: {
        id: string;
    }
}