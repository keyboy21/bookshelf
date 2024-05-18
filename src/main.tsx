import "~/styles/global.css";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { CookiesProvider } from "react-cookie";
import ReactDOM from "react-dom/client";
import { AuthProvider } from "./providers/auth.provider";
import { routeTree } from "./routeTree.gen";

// Set up a Router instance
const router = createRouter({
	routeTree,
	defaultPreload: "intent",
});

// Register things for typesafety
declare module "@tanstack/react-router" {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById("root");
if (rootElement !== null && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<CookiesProvider>
			<AuthProvider>
				<RouterProvider router={router} />
			</AuthProvider>
		</CookiesProvider>,
	);
}
