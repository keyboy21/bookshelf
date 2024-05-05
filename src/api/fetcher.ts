import axios from "axios";
import { BASE_URL } from "~/config/env.config";
import { md5 } from "js-md5";

export const fetcher = (url: string, key?: string, secret?: string) => {
	const sign = md5(`GET${url}${secret}`);
	const res = axios
		.get(`${BASE_URL}${url}`, {
			headers: {
				Key: key,
				Sign: sign,
			},
		})
		.then((res) => res.data);

	return res;
};
