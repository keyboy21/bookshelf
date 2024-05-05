import { BASE_URL } from "~/config/env.config";
import axios from "axios";
import { md5 } from "js-md5";
import type z from "zod";
import type { createBookSchema } from "~/schemas/shared.schema";

export const createBook = async (
	bookdData: z.infer<typeof createBookSchema>,
	key?: string,
	secret?: string,
) => {
	console.log(`POST/books{isbn:'${bookdData.isbn}'}${secret}`);
	const sign = md5(`POST/books${secret}`);

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
