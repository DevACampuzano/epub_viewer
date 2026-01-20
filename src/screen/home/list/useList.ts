import { useQuery } from "@realm/react";
import { Book } from "@/common/schemas";
import { useSettingStore } from "@/common/stores";

const listMenuOptionOrderBy: _MenuOptionOrderBy[] = [
	{
		value: "title",
		label: "Título (A-Z)",
	},
	{
		value: "author",
		label: "Autor (A-Z)",
	},
	{
		value: "createdAt",
		label: "Fecha agregado",
	},

	{
		value: "progress",
		label: "Progreso",
	},
	{
		value: "qualification",
		label: "Calificación",
	},
	{
		value: "lastReading",
		label: "Última lectura",
	},
];

const listMenuOptionDesign: _MenuOptionDesign[] = [
	{
		value: "grid",
		label: "Cuadrícula",
	},
	{
		value: "list",
		label: "Lista",
	},
];

export default () => {
	const allBooks = useQuery(Book);
	const orderBy = useSettingStore((state) => state.orderBy);
	const design = useSettingStore((state) => state.design);
	const setOrderBy = useSettingStore((state) => state.setOrderBy);
	const setDesign = useSettingStore((state) => state.setDesign);

	const orderBooks = (orderBy: OrderBy) => {
		let list = [...allBooks];
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

	return {
		books: orderBooks(orderBy),
		orderBy,
		design,
		setOrderBy,
		setDesign,
		progress:
			allBooks.reduce((acc, book) => acc + (book.progress || 0), 0) /
			(allBooks.length || 1),
		booksRead: allBooks.filter((book) => book.progress === 100),
		listMenuOptionDesign,
		listMenuOptionOrderBy,
		orderBooks,
	};
};
