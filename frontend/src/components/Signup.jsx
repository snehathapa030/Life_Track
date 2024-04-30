import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addUser } from "../redux/slice/userSlice";

const Signup = () => {
	const [username, setUsername] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [inputfield, setInputField] = useState("");
	const [load, setLoad] = useState("");
	const dispatch = useDispatch();

	const signUpUser = () => {
		console.log("signUpUser called");
		fetch("/api/user/signup", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				username: username,
				email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
			.then((json) => {
				dispatch(addUser(json.user));
				setLoad("");
			})
			.catch((error) => {
				console.error(error);
				setLoad("");
			});
	};
	const handleSignup = () => {
		if (username && email && password) {
			setInputField("");
			setLoad("Loading...");
			signUpUser();
		} else {
			setInputField("All Input Fields Required");
		}
	};
	return (
		<div className="flex flex-col items-center my-10 text-slate-300 min-h-[80vh]">
			<h2 className="text-2xl underline underline-offset-8 font-semibold">
				SignUp Life Track
			</h2>
			<div className="p-3 w-[80%] sm:w-[60%] md:w-[50%] lg:w-[40%] min-w-72 max-w-[1000px] border border-slate-400 bg-slate-500 rounded-lg h-fit  mt-5 transition-all">
				<form className="w-full flex justify-between flex-col">
					<h3 className="text-xl font-semibold p-1">
						Enter Username
					</h3>
					<input
						className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
						type="text"
						placeholder="Enter Username"
						name="username"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
					<h3 className="text-xl font-semibold p-1">
						Enter Email Address
					</h3>
					<input
						className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
						type="email"
						placeholder="Enter Email Address"
						name="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
					/>
					<h3 className="text-xl font-semibold p-1">
						Enter Password
					</h3>
					<input
						className="w-full border border-slate-700 my-3 py-4 px-8 rounded-full flex justify-between bg-white text-black "
						type="password"
						placeholder="Enter Password"
						name="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
					<div className="text-red-600 font-semibold self-center">
						{inputfield}
					</div>
					<button
						onClick={(e) => {
							handleSignup();
							e.preventDefault();
						}}
						className="w-full font-semibold hover:bg-black rounded-full px-5 py-4 mt-5 text-lg border border-slate-400  text-slate-500 hover:text-white bg-slate-800 transition-all"
					>
						{load == "" ? "SignUp" : load}
					</button>
					<div className="w-full flex items-center">
						<div className="w-full h-[1px] bg-slate-600"></div>
						<Link to="/login">
							<div className="p-3 font-semibold text-md hover:text-white">
								LogIn
							</div>
						</Link>
						<div className="w-full h-[1px] bg-slate-600"></div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Signup;
