import {
	Card,
	Table,
	TableBody,
	TableHead,
	TableHeaderCell,
	TableRow,
} from "@tremor/react";
import useSWR from "swr";
import { fetcher } from "~/api/fetcher";
import { Container } from "~/components/ui/Container";
import type { GetAllBooks } from "~/types/all.types";
import { BooksRow } from "./BooksRow";
import { TableLoading } from "./TableLoading";
import { useAuth } from "~/providers/auth.provider";

export const BooksTable = () => {
	const { user } = useAuth();

	const { data, error } = useSWR<GetAllBooks>("/books", (url: string) =>
		fetcher(url, user?.key, user?.secret),
	);

	if (error) return <section>Error fetching books</section>;
	if (!data) return <TableLoading />;

	return (
		<Container className="pt-10">
			<Card>
				<Table className="mt-5">
					<TableHead>
						<TableRow>
							<TableHeaderCell>#</TableHeaderCell>
							<TableHeaderCell>Title</TableHeaderCell>
							<TableHeaderCell>Author</TableHeaderCell>
							<TableHeaderCell>Cover</TableHeaderCell>
							<TableHeaderCell>Published</TableHeaderCell>
							<TableHeaderCell>Pages</TableHeaderCell>
							<TableHeaderCell>Action</TableHeaderCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{data.data?.map((book) => (
							<BooksRow book={book.book} key={book.book.id} />
						))}
					</TableBody>
				</Table>
			</Card>
		</Container>
	);
};
