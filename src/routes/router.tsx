import { createBrowserRouter } from "react-router-dom";
import { AuthLayout, RootLayout } from "~/layouts";
import HomePage from '~/routes/home/home.page'
import SignUpPage from '~/routes/signUp/signUp.page'


export const router = createBrowserRouter([
	{
		path: "/",
		element: <AuthLayout />,
		children: [
			{
				path: "/",
				element: <RootLayout />,
				children: [
					{
						path: "/",
						element: <HomePage />,
					},
				],
			},
		],
	},
	{
		path: "/signUp",
		element: <SignUpPage />,
	},
]);
