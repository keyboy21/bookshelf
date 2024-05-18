import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@tremor/react";
import { Save } from "lucide-react";
import { useForm } from "react-hook-form";
import type { z } from "zod";
import type { SignUpDto } from "~/api/auth/signUp";
import { signUp } from "~/api/auth/signUp";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "~/components/form/Form";
import { Input } from "~/components/form/Input";
import { Heading } from "~/components/typography/Heading";
import { Text } from "~/components/typography/Text";
import { Container } from "~/components/ui/Container";
import { notify } from "~/libs/notify.lib";
import { useAuth } from "~/providers/auth.provider";
import { signUpSchema } from "~/schemas/shared.schema";

export const SignUp = () => {
	const navigate = useNavigate();
	const { onSignUp } = useAuth();

	const form = useForm<z.infer<typeof signUpSchema>>({
		resolver: zodResolver(signUpSchema),
		defaultValues: {
			name: "",
			email: "",
			key: "",
			secret: "",
		},
	});

	const onRegister = async (formData: SignUpDto) => {
		const { email, key, name, secret } = formData;

		const signUpResponse = await signUp({ email, key, name, secret });

		if (signUpResponse.isOk) {
			onSignUp(signUpResponse.data, () => {
				console.log("navigate");
				navigate({ to: "/" });
			});
			return;
		}
		notify(`${signUpResponse.message}`, {
			type: "error",
		});
	};

	return (
		<section className="grow flex justify-center items-center mb-16">
			<Container className="mx-auto flex w-full flex-col justify-center sm:w-[350px]">
				<header className="flex flex-col mb-4 items-center mt-16">
					<Heading as="h1" level={3} className="mb-2">
						Create an account
					</Heading>
					<Text variant="muted" className="text-center">
						Enter your credentials below to create an account
					</Text>
				</header>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onRegister)}
						className="flex flex-col gap-y-3"
					>
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Name</FormLabel>
									<FormControl>
										<Input placeholder="Jackson" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="email"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Email</FormLabel>
									<FormControl>
										<Input
											placeholder="jackson@gmail.com"
											type="email"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="key"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Key</FormLabel>
									<FormControl>
										<Input placeholder="Mason" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="secret"
							render={({ field }) => (
								<FormItem>
									<FormLabel required>Secret</FormLabel>
									<FormControl>
										<Input placeholder="MySecret" type="text" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button color="green" icon={Save} type="submit">
							Создать
						</Button>
					</form>
				</Form>
			</Container>
		</section>
	);
};
