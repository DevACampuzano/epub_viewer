import { useQuery } from "@realm/react";
import { useCallback, useEffect, useState } from "react";
import type { Results } from "realm";
import { useDebounce, useForm } from "@/common/hooks";
import { Book } from "@/common/schemas";
import { useSettingStore } from "@/common/stores";

const options: _optionList[] = [
    { label: "Finalizado", value: "finish" },
    { label: "En progreso", value: "in-progress" },
    { label: "No iniciado", value: "not-started" },
];
export default () => {
    const { onChange, form } = useForm<_IFormFilter, never>({
        searchTerm: "",
        status: [],
        category: [],
    });
    const categories = useSettingStore((state) => state.categories);
    const allBooks = useQuery(Book);
    const [searchResults, setSearchResults] = useState<Results<Book> | _IBook[]>(
        allBooks,
    );

    const debouncedRefetch = useDebounce((...args: unknown[]) => {
        const options = args[0] as statusFilter[];
        const category = args[1] as string[];
        let list: Results<Book> | _IBook[] = [...allBooks];

        if (form.searchTerm.trim().length > 0) {
            list = list.filter((book) =>
                book.title.toLowerCase().includes(form.searchTerm.trim().toLowerCase()),
            );
        }

        if (options.length > 0) {
            list = list.filter(
                (book) =>
                    (options.includes("finish") && book.progress === 100) ||
                    (options.includes("in-progress") &&
                        book.progress < 100 &&
                        book.progress > 0) ||
                    (options.includes("not-started") && book.progress === 0),
            );
        }

        if (category.length > 0) {
            list = list.filter((book) => book.categories.some((cat: string) => category.includes(cat)));
        }

        setSearchResults(list);
    }, 500);

    const handleChangeSearchText = useCallback(
        (text: string) => {
            onChange(text, "searchTerm");
            debouncedRefetch(form.status);
        },
        [debouncedRefetch, onChange, form.status],
    );

    useEffect(() => {
        debouncedRefetch(form.status, form.category);
    }, [form.status, form.category, debouncedRefetch]);

    return {
        options,
        handleChangeSearchText,
        searchResults,
        onChange,
        categories,
        ...form
    };
};
