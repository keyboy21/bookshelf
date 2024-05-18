import { Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { SignUp } from "~/modules/signUp";
import { useAuth } from "../providers/auth.provider";

export const AuthLayout = ({ children }: { children: ReactNode }) => {
	const { status, user } = useAuth();
	if (status === "loading") {
		return <LoadingAuth />;
	}
	if (status === "guest" || !user) {
		return <SignUp />;
	}
	return (
		<>
			<Outlet />
			{children}
		</>
	);
};

export const LoadingAuth = () => {
	return (
		<div className="fixed top-0 left-0 bg-white flex justify-center items-center">
			<div className="relative inline-flex">
				<div className="w-8 h-8 bg-stone-700 rounded-full" />
				<div className="w-8 h-8 bg-stone-700 rounded-full absolute top-0 left-0 animate-ping" />
				<div className="w-8 h-8 bg-stone-700 rounded-full absolute top-0 left-0 animate-pulse" />
			</div>
		</div>
	);
};
