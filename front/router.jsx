import {createBrowserRouter} from "react-router-dom";
import App from "@/App.jsx";
import Homepage from "@/pages/Homepage/Homepage.jsx";
import Pantry from "@/pages/Pantry/Pantry.jsx";

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{
				index: true,
				element: <Homepage />
			},{
				path:'pantry',
				element: <Pantry />
			}
		]
	}
])