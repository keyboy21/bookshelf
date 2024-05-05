import { BASE_URL } from "~/config/env.config";
import axios from "axios";
import { md5 } from "js-md5";

export const deleteBook = async (
	bookId: number,
	key?: string,
	secret?: string,
) => {
	const sign = md5(`DELETE/books${secret}`);

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
