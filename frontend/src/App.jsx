import { useEffect, useState } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import {
	RouterProvider,
	createBrowserRouter,
	Outlet,
	useNavigate,
} from "react-router-dom";
import Signup from "./components/Signup";
import Login from "./components/Login";
import useScrollTop from "./utils/useScrollTop";
import { useSelector } from "react-redux";
import Welcome from "./components/Welcome";
const AppLayout = () => {
	useScrollTop();
	const user = useSelector((store) => store.user.userDetail);
	const navigate = useNavigate();

	useEffect(() => {
		if (user) {
			navigate("/home");
		} else {
			navigate("/login");
		}
	}, [user]);
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
};

const appRouter = createBrowserRouter([
	{
		path: "/",
		element: <AppLayout />,
		children: [
			{
				path: "/",
				element: <Welcome />,
			},
			{
				path: "home",
				element: <Main />,
			},
			{
				path: "signup",
				element: <Signup />,
			},
			{
				path: "login",
				element: <Login />,
			},
			{
				path: "*",
				element: <div>Something went wrong</div>,
			},
		],
	},
]);
function App() {
	return (
		<div className="font-mono tracking-tighter sm:tracking-normal bg-gray-700 min-h-screen flex flex-col justify-between">
			<RouterProvider router={appRouter} />
		</div>
	);
}
export default App;
