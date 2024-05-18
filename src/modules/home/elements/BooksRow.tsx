import { useRouter } from "@tanstack/react-router";
import {
	Button,
	Dialog,
	DialogPanel,
	TableCell,
	TableRow,
} from "@tremor/react";
import { Trash2, XCircle } from "lucide-react";
import type { FC } from "react";
import { useSWRConfig } from "swr";
import { deleteBook } from "~/api/books/deleteBook.api";
import { Heading } from "~/components/typography/Heading";
import { useModal } from "~/hooks/useModal";
import { notify } from "~/libs/notify.lib";
import { time } from "~/libs/time.lib";
import type { Book } from "~/types/all.types";
import { EditBook } from "./EditBook";

export const BooksRow: FC<BookRowProps> = ({ book }) => {
	const { close, open, visible } = useModal();
	const router = useRouter();
	const { mutate } = useSWRConfig();

	const onDelete = async (id: number) => {
		close();
		const res = await deleteBook(id);
		if (res.data) {
			mutate("/expenses");
			notify("Расход успешно удалень", {
				type: "success",
			});
			router.preloadRoute({
				to: "/",
			});
		} else {
			notify("Расход не удалень", {
				type: "error",
			});
		}
	};

	return (
		<>
			<TableRow className="gap-5 *:text-black" key={book.id}>
				<TableCell>{book.id}</TableCell>
				<TableCell>{book.title}</TableCell>
				<TableCell>{book.author}</TableCell>
				<TableCell>{book.cover}</TableCell>
				<TableCell>{time(book.published).format("YYYY")}</TableCell>
				<TableCell>{book.pages}</TableCell>
				<TableCell className="max-w-12">
					<div className="flex gap-5">
						<Button onClick={() => open()} icon={Trash2} color="red">
							Delete
						</Button>
						<EditBook book={book} />
					</div>
					<Dialog open={visible} onClose={close} static={true}>
						<DialogPanel>
							<Heading className="text-lg font-semibold text-tremor-content-strong text-center">
								Are you sure you want to delete?
							</Heading>
							<div className="flex justify-evenly">
								<Button
									color="neutral"
									icon={XCircle}
									className="mt-8"
									onClick={close}
								>
									Cancel
								</Button>
								<Button
									icon={Trash2}
									color="red"
									className="mt-8"
									onClick={() => onDelete(book.id)}
								>
									Delete
								</Button>
							</div>
						</DialogPanel>
					</Dialog>
				</TableCell>
			</TableRow>
		</>
	);
};

type BookRowProps = {
	book: Book;
};
