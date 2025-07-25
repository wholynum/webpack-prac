import { createRoot } from "react-dom/client"
import { App } from "@/components/App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { LazyAbout } from "@/pages/about/About.lazy";
import { LazyShop } from "@/pages/shop/Shop.lazy";
import { Suspense } from "react";

const root = document.getElementById("root");
if (!root) { throw new Error("no root") }
const container = createRoot(root)
const router = createBrowserRouter([
	{
		path: '',
		element: <App />,
		children: [
			{
				path: '/about',
				element: <Suspense fallback={'Loading about'}><LazyAbout /></Suspense>
			},
			{
				path: '/shop',
				element: <Suspense fallback={'Loading shop'}><LazyShop /></Suspense>
			}
		]
	}
])

container.render(<RouterProvider router={router} />)