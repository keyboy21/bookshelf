import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Select, SelectItem } from "@tremor/react";
import { Save, SquarePen, XCircle } from "lucide-react";
import type { FC } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import type { z } from "zod";
import { editBook } from "~/api/books/editBook.api";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/form/Form";
import { Input } from "~/components/form/Input";
import {
	Sheet,
	SheetContent,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "~/components/ui/Sheet";
import { useModal } from "~/hooks/useModal";
import { notify } from "~/libs/notify.lib";
import { useAuth } from "~/providers/auth.provider";
import { editBookSchema } from "~/schemas/shared.schema";
import type { Book } from "~/types/all.types";

export const EditBook: FC<EditBookProps> = ({ book, status }) => {
	const { mutate } = useSWRConfig();
	const { close, open, visible } = useModal();
	const { user } = useAuth();

	const form = useForm<z.infer<typeof editBookSchema>>({
		resolver: zodResolver(editBookSchema),
		defaultValues: {
			status: status,
			author: book.author,
			isbn: book.isbn,
			pages: book.pages,
			published: book.published,
			title: book.title,
		},
	});

	const onEdit = async (formData: z.infer<typeof editBookSchema>) => {
		const res = await editBook(book.id, formData, user?.key, user?.secret);
		if (res.isOk) {
			close();
			mutate("/books");
			notify("Book status succesfuly edited", {
				type: "success",
			});
		} else {
			notify("Edit kook status failed", {
				type: "error",
			});
		}
	};

	return (
		<Sheet onClose={open} open={visible} modal>
			<Button onClick={open} icon={SquarePen} color="yellow">
				Edit Book
			</Button>
			<SheetContent onClose={close}>
				<SheetHeader>
					<SheetTitle>Edit book</SheetTitle>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onEdit)}
							className="flex flex-col gap-y-3"
						>
							<FormField
								control={form.control}
								name="isbn"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Isbn</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="title"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Title</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="author"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Author</FormLabel>
										<FormControl>
											<Input {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="published"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Published</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="pages"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Pages</FormLabel>
										<FormControl>
											<Input type="number" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Status</FormLabel>
										<FormControl>
											<Select
												defaultValue={`${status}`}
												onValueChange={field.onChange}
											>
												<SelectItem value="0">New</SelectItem>
												<SelectItem value="1">Reading</SelectItem>
												<SelectItem value="2">Finished</SelectItem>
											</Select>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<SheetFooter className="flex gap-3">
								<Button color="green" icon={Save} type="submit">
									Edit
								</Button>
								<Button onClick={close} color="red" icon={XCircle}>
									Cancel
								</Button>
							</SheetFooter>
						</form>
					</Form>
				</div>
			</SheetContent>
		</Sheet>
	);
};

type EditBookProps = {
	book: Book;
	status: number;
};
