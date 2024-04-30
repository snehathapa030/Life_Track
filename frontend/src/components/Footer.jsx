import React from "react";
import Logo from "../assets/logo.png";

const Footer = () => {
	return (
		<div className=" bg-gray-800 px-8 py-5 flex justify-center items-center text-sm sm:text-md sm:font-medium text-slate-300 border-t border-slate-400 rounded-tr-full rounded-tl-full">
			<p className="tracking-tighter">
				&copy; 2024 <span className="hidden sm:inline">LifeTrack</span>
				<span className="sm:hidden">LTrack</span> | All rights Reserved
			</p>
		</div>
	);
};

export default Footer;
