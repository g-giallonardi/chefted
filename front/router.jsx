import {createBrowserRouter} from "react-router-dom";
import App from "@/App.jsx";
import Homepage from "@/pages/Homepage/Homepage.jsx";

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Homepage />
			}
		]
	}
])