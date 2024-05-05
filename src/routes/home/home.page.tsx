import type { FC } from "react";
import { Heading } from "~/components/typography/Heading";
import { BooksTable } from "./elements/BooksTable";
import { CreateBook } from "./elements/CreateBook";
import { Suspense } from "react";

const HomeModule: FC = () => {
	return (
		<section className="py-10">
			<div className="flex flex-col items-center gap-5">
				<Heading className="text-center" level={1} as="h1">
					Books
				</Heading>
				<CreateBook />
				<Suspense>
					<BooksTable />
				</Suspense>
			</div>
		</section>
	);
};

export default HomeModule;
