import React from "react";
import Slider from "react-slick";
import {
	bid_four,
	bid_one,
	bid_six,
	bid_three,
	bid_two,
} from "../Constant/Index";

function Peopleimg() {
	const layers = [bid_two, bid_three, bid_six, bid_one, bid_four];

	const settings = {
		infinite: true,
		centerMode: true,
		centerPadding: "60px",
		slidesToShow: 3,
		slidesToScroll: 1,
		cssEase: "ease-in-out",
		autoplay: true,
		autoplaySpeed: 2000, // 3 seconds per slide
		pauseOnHover: true,
		arrows: false,
		speed: 700,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 2,
					centerPadding: "40px",
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					centerPadding: "20px",
				},
			},
		],
	};

	return (
		<section className="people_img-sec relative">
			<div className="slider-container relative overflow-hidden px-4">
				{/* Shadows */}
				<div className="left-shadow" />
				<div className="right-shadow" />
				<div className="top-shadow" />
				<div className="bottom-shadow" />

				<Slider {...settings}>
					{layers.map((layer, index) => (
						<div key={index} className="px-2">
							<div className="img_wrapper">
								<img
									src={layer}
									alt={`people-${index}`}
									className="img-slide transition-all duration-700 ease-in-out"
								/>
							</div>
						</div>
					))}
				</Slider>
			</div>
		</section>
	);
}

export default Peopleimg;
