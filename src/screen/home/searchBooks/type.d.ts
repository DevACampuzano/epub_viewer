type statusFilter = "finish" | "in-progress" | "not-started";

type _optionList = {
    label: string;
    value: statusFilter;
};

type _IFormFilter = {
    searchTerm: string;
    status: statusFilter[];
    category: string[];
};