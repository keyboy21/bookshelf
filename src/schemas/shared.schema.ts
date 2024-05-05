import { z } from "zod";

export const createBookSchema = z.object({
	isbn: z.string().trim().min(1),
});

enum Status {
	New = 0,
	Reading = 1,
	Finished = 2,
}
export const editBookSchema = z.object({
	title: z.string().trim().min(1, {
		message: "title must be at least 1 characters.",
	}),
	isbn: z.string().trim(),
	author: z.string().trim().min(1, {
		message: "author must be at least 1 characters.",
	}),
	pages: z.coerce.number(),
	published: z.coerce.number(),
	status: z.nativeEnum(Status),
});

export const signUpSchema = z.object({
	name: z.string().trim().min(2, {
		message: "name must be at least 2 characters.",
	}),
	email: z.string().email({
		message: "enter correct email",
	}),
	key: z.string().trim().min(6, {
		message: "key must be at least 6 characters.",
	}),
	secret: z.string().trim().min(6, {
		message: "secret must be at least 6 characters.",
	}),
});
