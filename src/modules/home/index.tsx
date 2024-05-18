import type { FC } from "react";
import { Heading } from "~/components/typography/Heading";
import { BooksTable } from "~/modules/home/elements/BooksTable";
import { CreateBook } from "~/modules/home/elements/CreateBook";

export const HomeModule: FC = () => {
	return (
		<section className="py-10">
			<div className="flex flex-col items-center gap-5">
				<Heading className="text-center" level={1} as="h1">
					Books
				</Heading>
				<CreateBook />
				<BooksTable />
			</div>
		</section>
	);
};
