import React from "react";
import { Link } from "react-router-dom";

const Welcome = () => {
	return (
		<div className="font-mono text-4xl md:text-5xl lg:text-6xl font-extrabold flex flex-col w-full items-center gap-5 text-slate-800">
			<h1>
				<span className="text-slate-900">W</span>elcome{" "}
				<span className="text-slate-900">T</span>o
			</h1>
			<h1>
				<span className="text-slate-900">L</span>ife{" "}
				<span className="text-slate-900">T</span>rack
			</h1>
			<a href="/home">
				<button className="underline">Home</button>
			</a>
		</div>
	);
};

export default Welcome;
