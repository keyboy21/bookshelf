export interface GetAllBooks {
	data: Datum[] | null;
	isOk: boolean;
	message: string;
}

export interface Datum {
	book: Book;
	status: number;
}

export interface Book {
	id: number;
	isbn: string;
	title: string;
	cover: string;
	author: string;
	published: number;
	pages: number;
}
