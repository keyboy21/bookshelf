import { BASE_URL } from "~/config/env.config";
import axios from "axios";
import type z from "zod";
import type { createBookSchema } from "~/schemas/shared.schema";
import md5 from "crypto-js/md5";

export const createBook = async (
	bookdData: z.infer<typeof createBookSchema>,
	key?: string,
	secret?: string,
): Promise<Response> => {
	console.log(`POST/books{isbn:"${bookdData.isbn}"}${secret}`);
	const sign = md5(
		`POST/books{isbn:"${bookdData.isbn}"}${"MyUserSecret"}`,
	).toString();

	const response = await axios({
		method: "POST",
		url: `${BASE_URL}/books`,
		headers: {
			Key: key,
			Sign: sign,
		},
		data: {
			isbn: bookdData.isbn,
		},
	})
		.then((response) => response.data)
		.catch((error) => {
			return error.response.data;
		});

	return response;
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
