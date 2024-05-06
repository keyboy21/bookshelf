import axios from "axios";
import md5 from "crypto-js/md5";
import type z from "zod";
import { BASE_URL } from "~/config/env.config";
import type { editBookSchema } from "~/schemas/shared.schema";

export const editBook = async (
	id: number,
	bookdData: z.infer<typeof editBookSchema>,
	key?: string,
	secret?: string,
): Promise<Response> => {
	// TODO: Check this and fix. It seems bakend api not right
	const sign = md5(`PATCH/books${secret}`).toString();

	const res = await axios
		.patch(
			`${BASE_URL}/books/${id}`,
			{
				book: {
					isbn: bookdData.isbn,
					title: bookdData.title,
					author: bookdData.author,
					published: bookdData.published,
					pages: bookdData.pages,
				},
				status: bookdData.status,
			},
			{
				headers: {
					Key: key,
					Sign: sign,
				},
			},
		)
		.then((response) => response.data)
		.catch((error) => {
			return error.response.data;
		});

	return res;
};

export interface Response {
	data: Data;
	isOk: boolean;
	message: string;
}
interface Data {
	book: Book;
	status: number;
}
interface Book {
	id: number;
	isbn: string;
	title: string;
	cover: string;
	author: string;
	published: number;
	pages: number;
}
