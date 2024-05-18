import { createFileRoute } from "@tanstack/react-router";
import { AuthLayout } from "~/layout/auth.layout";
import { HomeModule } from "~/modules/home";

export const Route = createFileRoute("/")({
	component: () => (
		<>
			<AuthLayout>
				<HomeModule />
			</AuthLayout>
		</>
	),
});
