import React from "react";
import Logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../redux/slice/userSlice";
import { deletetodo } from "../redux/slice/todoSlice";

const Header = () => {
	const user = useSelector((store) => store.user.userDetail);
	const dispatch = useDispatch();
	const handleLogout = () => {
		console.log("logOutUser called");
		fetch("http://localhost:8080/api/user/logout", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		})
			.then((response) => response.json())
			.then((json) => {
				console.log(json);
				dispatch(removeUser());
				dispatch(deletetodo());
			})
			.catch((error) => {
				console.error(error.message);
			});
	};
	return (
		<div className="bg-gray-800 px-4 sm:px-8 py-2 flex justify-between items-center text-sm sm:text-lg font-medium text-slate-300 border-b border-slate-400">
			<div className="flex w-fit gap-3 items-center">
				<Link to="/">
					<img
						className="w-12 sm:w-14 md:w-16 rounded-md hover:rounded-full transition-all"
						src={Logo}
						alt="LTrack"
					/>
				</Link>
				<Link to="/">
					<h1 className="hover:text-white">LifeTrack</h1>
				</Link>
			</div>
			<div>
				{user == null ? (
					<Link to={"/login"}>
						<button className="bg-black rounded-full px-5 py-2 border border-slate-400 shadow-lg hover:text-black hover:bg-white transition-all">
							Login
						</button>
					</Link>
				) : (
					<div className="flex items-center gap-3">
						<p className="uppercase text-white">
							Hi,{" "}
							<span className="text-lime-400">
								{user?.username}
							</span>
						</p>
						<button
							onClick={handleLogout}
							className="bg-black rounded-full px-5 py-2 border border-slate-400 shadow-lg hover:text-black hover:bg-white transition-all"
						>
							LogOut
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default Header;
