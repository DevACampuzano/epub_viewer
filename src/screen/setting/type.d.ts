type _IFormNotes = {
    label: string;
    color: string;
    style: "highlight" | "underline";
}

interface Books extends Omit<_IBook, "_id"> {
    _id: string;
}

type _IDataBackup = {
    books: Books[];
    setting: StateSettings;
};