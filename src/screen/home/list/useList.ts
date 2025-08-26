import { useBookStore } from "@/common/stores";

interface MenuOptionOrderBy {
	label: string;
	value: OrderBy;
}

interface MenuOptionDesign {
	label: string;
	value: Design;
}

const listMenuOptionOrderBy: MenuOptionOrderBy[] = [
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

const listMenuOptionDesign: MenuOptionDesign[] = [
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
	const books = useBookStore((state) => state.books);
	const orderBy = useBookStore((state) => state.orderBy);
	const design = useBookStore((state) => state.design);
	const setOrderBy = useBookStore((state) => state.setOrderBy);
	const setDesign = useBookStore((state) => state.setDesign);
	const progress = useBookStore((state) => state.calculateOverallProgress());

	return {
		books,
		orderBy,
		design,
		setOrderBy,
		setDesign,
		progress,
		booksRead: books.filter((book) => book.progress === 100),
		listMenuOptionDesign,
		listMenuOptionOrderBy,
	};
};
