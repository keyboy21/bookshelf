import axios from "axios";
import { BASE_URL } from "~/config/env.config";

export interface SignUpDto {
	name: string;
	email: string;
	key: string;
	secret: string;
}

export const signUp = async (signUp: SignUpDto) => {
	const res = await axios
		.post(`${BASE_URL}/signup`, {
			name: signUp.name,
			email: signUp.email,
			key: signUp.key,
			secret: signUp.secret,
		})
		.then((response) => response.data)
		.catch((error) => {
			return error.response.data;
		});

	return res;
};

export interface SignUpResponse {
	data: Data | null;
	isOk: boolean;
	message: string;
}

export interface Data {
	email: string;
	id: number;
	key: string;
	name: string;
	secret: string;
}
