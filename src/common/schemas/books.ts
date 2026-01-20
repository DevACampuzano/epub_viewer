import type { Annotation, Bookmark } from "@epubjs-react-native/core";
import { Realm } from "@realm/react";

type generateBook = {
	file: string;
	image: string;
	title: string;
	author: string;
	description: string;
	language: string;
	publisher: string;
	rights: string;
	totalPages: number;
	currentPage?: string;
};

export class Book extends Realm.Object implements _IBook {
	_id!: Realm.BSON.ObjectId;
	file!: string;
	image!: string;
	title!: string;
	author!: string;
	description?: string;
	language?: string;
	publisher?: string;
	rights?: string;
	qualification?: number;
	opinion?: string;
	currentPage?: string;
	currentPageIndex!: number;
	totalPages!: number;
	progress!: number;
	createdAt!: number;
	lastReading!: number;
	bookmarks!: Bookmark[];
	annotations!: Annotation[];
	categories!: string[];
	finalDate?: number;

	static generate({
		author,
		description,
		file,
		image,
		language,
		publisher,
		rights,
		title,
		totalPages,
		currentPage,
	}: generateBook) {
		return {
			_id: new Realm.BSON.ObjectId(),
			file,
			image,
			title,
			author,
			description,
			language,
			publisher,
			rights,
			totalPages,
			currentPage: currentPage ? currentPage : "",
			currentPageIndex: 1,
			opinion: "",
			qualification: 0,
			progress: 0,
			createdAt: Date.now(),
			lastReading: Date.now(),
			bookmarks: [],
			annotations: [],
			categories: [],
		};
	}

	static schema = {
		name: "Book",
		primaryKey: "_id",
		properties: {
			_id: "objectId",
			file: "string",
			image: "string",
			title: "string",
			author: "string",
			description: "string",
			language: "string",
			publisher: "string",
			rights: "string",
			qualification: "int",
			opinion: "string",
			currentPage: "string",
			currentPageIndex: "int",
			totalPages: "int",
			progress: "double",
			createdAt: "int",
			lastReading: "int",
			bookmarks: "mixed[]",
			annotations: "mixed[]",
			categories: "string[]",
		},
	};
}
