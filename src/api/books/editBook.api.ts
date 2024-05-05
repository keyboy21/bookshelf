import axios from "axios";
import { md5 } from "js-md5";
import type z from "zod";
import { BASE_URL } from "~/config/env.config";
import type { editBookSchema } from "~/schemas/shared.schema";

export const editBook = async (
	id: number,
	bookdData: z.infer<typeof editBookSchema>,
	key?: string,
	secret?: string,
) => {
	const sign = md5(`POST/books${secret}`);

	const res = await axios
		.patch(
			`${BASE_URL}/books/${id}`,
			{ bookdData },
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
