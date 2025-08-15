import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Banner from "../Components/Banner";
import Peopleimg from "../Components/Peopleimg";
import Journeyoflove from "../Components/Journeyoflove";
import Connetwithme from "../Components/Connetwithme";
import Loveyoudeserve from "../Components/Loveyoudeserve";
import Faq from "../Components/Faq";
import Reality from "../Components/Reality";
import Specialist from "../Components/Specialist";
import Footer from "../Components/Footer";
import Videosec from "../Components/Videosec";
import PackageTabs from "../Components/PackageTabs";
import Contactus from "../Components/Contactus";
import Header from "../Components/Header/Header";

function Home() {
	const location = useLocation();

	useEffect(() => {
		if (location.hash) {
			const element = document.querySelector(location.hash);
			element?.scrollIntoView({ behavior: "smooth", block: "start" });
		}
	}, [location]);
	const [myShow, getMyshow] = useState(false);
	return (
		<>
			<Header />
			<Banner />
			<Peopleimg />
			<Journeyoflove />
			<Connetwithme />
			<Loveyoudeserve />
			<Faq />
			<Videosec />
			<Reality />
			<PackageTabs getMyshow={getMyshow} />
			<Specialist />
			<Contactus />
			<Footer />
		</>
	);
}

export default Home;
