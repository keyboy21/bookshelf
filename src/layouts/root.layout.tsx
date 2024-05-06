import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

export const RootLayout = () => {
	return (
		<>
			<main>
				<Outlet />
			</main>
			<Toaster />
		</>
	);
};
