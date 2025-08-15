import React from "react";
import Slider from "react-slick";
import { Vector } from "../Constant/Index";

function Webslider() {
	var settings = {
		dots: true,
		infinite: false,
		speed: 500,
		slidesToShow: 1,
		arrows: false,
		slidesToScroll: 1,
		initialSlide: 0,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
					dots: true,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					initialSlide: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};
	return (
		<>
			<div className="slider-dv">
				<div className="slider-container">
					<Slider {...settings}>
						<div className="slide-img">
							<div className="slide_text">
								<img src={Vector} />
								<p>
									“I joined without knowing what to expect, but I appreciated
									how upfront everything was. There was no confusion about
									intentions, and I connected with someone who valued honesty
									just as much as I did. It’s refreshing to have that kind of
									clarity from the start.”
								</p>
								<div className="slider_border"></div>
								<h4>— Daniel, 36</h4>
								{/* <h4>John Smith</h4> */}
							</div>
						</div>
						<div className="slide-img">
							<div className="slide_text">
								<img src={Vector} />
								<p>
									“I’ve tried other platforms where the conversations felt
									forced or unclear. Here, I didn’t have to explain myself over
									and over. I found someone who understood my needs and
									respected my boundaries. That kind of understanding is rare.”
								</p>
								<div className="slider_border"></div>
								<h4>— Leah, 29</h4>
								{/* <h4>John Smith</h4> */}
							</div>
						</div>
						<div className="slide-img">
							<div className="slide_text">
								<img src={Vector} />
								<p>
									“What stood out to me was how straightforward the entire
									process was. I matched with someone who shared similar
									expectations, and we were able to build a connection without
									any pressure. It felt honest and easy to manage.”
								</p>
								<div className="slider_border"></div>
								<h4>— Marcus, 41</h4>
								{/* <h4>John Smith</h4> */}
							</div>
						</div>
						<div className="slide-img">
							<div className="slide_text">
								<img src={Vector} />
								<h6>
									“I didn’t expect to find something real so quickly, but this
									platform gave me exactly what I was looking for.”
								</h6>
								<p>
									I joined out of curiosity, unsure of what to expect. Within a
									few days, I connected with someone who truly matched what I
									was seeking. The experience felt respectful and
									straightforward, and that made all the difference for me.
								</p>
								<div className="slider_border"></div>
								<h4>— Jordan T., Los Angeles</h4>
								{/* <h4>John Smith</h4> */}
							</div>
						</div>
						<div className="slide-img">
							<div className="slide_text">
								<img src={Vector} />
								<h6>
									“This is one of the few platforms where intentions are clear
									and communication is honest.”
								</h6>
								<p>
									Most dating apps feel chaotic and unclear, but this felt very
									different. I appreciated how upfront people were about what
									they wanted. It created space for more meaningful
									conversations without the usual guesswork.
								</p>
								<div className="slider_border"></div>
								<h4>— Maria F., Chicago</h4>
								{/* <h4>John Smith</h4> */}
							</div>
						</div>
						<div className="slide-img">
							<div className="slide_text">
								<img src={Vector} />
								<h6>
									“What stood out to me was the quality of people and how easy it
									was to find genuine connections.”
								</h6>
								<p>
									I’ve tried a lot of apps before this, but none matched the
									clarity and structure here. I had better conversations, and
									the matching felt more intentional. It’s refreshing to use
									something that actually works the way it should.
								</p>
								<div className="slider_border"></div>
								<h4>— Nathan R., New York</h4>
								{/* <h4>John Smith</h4> */}
							</div>
						</div>
					</Slider>
				</div>
			</div>
		</>
	);
}

export default Webslider;
