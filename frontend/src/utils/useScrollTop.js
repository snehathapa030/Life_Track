import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useScrollTop = () => {
	const location = useLocation();
	useEffect(() => {
		window.scrollTo({
			top: 0,
			behavior: "smooth",
		});
	}, [location]);
};

export default useScrollTop;
