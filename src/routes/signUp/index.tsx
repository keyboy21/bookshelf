import { createFileRoute } from "@tanstack/react-router";
import { SignUp } from "~/modules/signUp";

export const Route = createFileRoute("/signUp/")({
	component: SignUp,
});
