import { Outlet } from "@tanstack/react-router";
import React from "react";

export const RootLayout = () => {
	return (
		<>
			<main>
				<Outlet />
			</main>
		</>
	);
};
