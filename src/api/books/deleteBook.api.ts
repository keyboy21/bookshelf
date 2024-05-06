import { BASE_URL } from "~/config/env.config";
import axios from "axios";
import md5 from "crypto-js/md5";
import type { Book } from "~/types/all.types";

export const deleteBook = async (
	bookId: number,
	key?: string,
	secret?: string,
): Promise<Response> => {
	// TODO: Check this and fix. It seems bakend api not right
	const sign = md5(`DELETE/books${secret}`).toString();

	const response = await axios
		.delete(`${BASE_URL}/books/${bookId}`, {
			headers: {
				Key: key,
				Sign: sign,
			},
		})
		.then((response) => response.data)
		.catch((error) => {
			return error.response.data;
		});
	return response;
};

export interface Response {
	data: Book[];
	isOk: boolean;
	message: string;
}
