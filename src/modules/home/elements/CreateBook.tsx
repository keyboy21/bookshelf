import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@tanstack/react-router";
import { Button } from "@tremor/react";
import { BadgePlus, Save, XCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import type z from "zod";
import { createBook } from "~/api/books/createBook.api";
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
import { createBookSchema } from "~/schemas/shared.schema";

export const CreateBook = () => {
	const { user } = useAuth();
	const { mutate } = useSWRConfig();
	const { close, open, visible } = useModal();

	const router = useRouter();

	const form = useForm<z.infer<typeof createBookSchema>>({
		resolver: zodResolver(createBookSchema),
		defaultValues: {
			isbn: "9781118464496",
		},
	});

	const onSave = async (formData: z.infer<typeof createBookSchema>) => {
		close();
		form.reset();
		const res = await createBook(formData, user?.key, user?.secret);

		if (res.data) {
			mutate("/books");
			notify("Book succesfult created", {
				type: "success",
			});
			router.preloadRoute({
				to: "/",
			});
		} else {
			notify("Book not created", {
				type: "error",
			});
		}
	};

	return (
		<Sheet onClose={open} open={visible}>
			<Button onClick={open} className="w-fit" icon={BadgePlus} color="green">
				Create book
			</Button>
			<SheetContent onClose={close}>
				<SheetHeader>
					<SheetTitle>Create book</SheetTitle>
				</SheetHeader>
				<div className="grid gap-4 py-4">
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSave)}
							className="flex flex-col gap-y-3"
						>
							<FormField
								control={form.control}
								name="isbn"
								render={({ field }) => (
									<FormItem>
										<FormLabel required>Isbn</FormLabel>
										<FormControl>
											<Input placeholder="9781118464496" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<SheetFooter className="flex gap-3">
								<Button color="green" icon={Save} type="submit">
									Create
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
