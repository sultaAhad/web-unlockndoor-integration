import React, { useRef, useState } from "react";
import Slider from "react-slick";
import { girlimg, outline1, outline2 } from "../Constant/Index";
import { Link } from "react-router-dom";

function Journeyoflove() {
	const sliderRef = useRef(null); // create slider reference

	const sliderSettings = {
		dots: true,
		infinite: true,
		speed: 800,
		fade: true,
		arrows: false,
		autoplay: true,
		autoplaySpeed: 2000,
		slidesToShow: 1,
		slidesToScroll: 1,
		pauseOnHover: false, // we handle pause manually
	};

	const handlePause = () => {
		if (sliderRef.current) {
			sliderRef.current.slickPause();
		}
	};

	const handlePlay = () => {
		if (sliderRef.current) {
			sliderRef.current.slickPlay();
		}
	};

	return (
		<section className="banner_sec pb-0 mt-5 pt-3" id="about-section">
			<div className="container-fluid p-0">
				<div className="row align-items-center">
					{/* Fixed Left Image */}
					<div className="col-md-6">
						<div className="girl_img_wrapper">
							<img src={girlimg} alt="girl" className="img-fluid" />
						</div>
					</div>

					{/* Right Side Slick Text Slider */}
					<div className="col-md-6">
						<div
							className="wrapper p-lg-3 p-md-5"
							onMouseEnter={handlePause}
							onMouseLeave={handlePlay}
							onTouchStart={handlePause}
							onTouchEnd={handlePlay}
						>
							<Slider ref={sliderRef} {...sliderSettings}>
								{/* Slide 1 */}
								<div className="text_wrapper">
									<h5>About Us</h5>
									<h2>
										<span className="gradient-text">A No-Game</span> Zone for
									</h2>
									<h2>Real Ones Only</h2>
									<p>
										We built{" "}
										<span className="gradient-text">UnlockNthedoors</span> on
										one powerful truth: things just work better when everyone’s
										on the same page. No mixed signals. Just real people
										bringing real intentions to the table.
									</p>
									<p>
										Here, mutual respect isn’t a buzzword—it’s the baseline.
										Boundaries are honored, conversations are honest, and
										connections are built by choice, not chance.
									</p>
									<p>
										Forget trends and dating drama. This is about what works for
										you—authentic, grown, and fully on your terms.
									</p>
									<div className="button_width">
										<h4>Join Now</h4>
										<Link
											to="/man-registration"
											className="btn-bgtransparent under-line me-2"
										>
											<span className="pe-2">
												<img src={outline1} alt="outline1" />
											</span>
											men
										</Link>
										<Link
											to="/women-registration"
											className="border d-flex align-items-center"
										>
											<span>
												<img src={outline2} alt="outline2" />
											</span>
											women
										</Link>
									</div>
								</div>

								{/* Slide 2 */}
								<div className="text_wrapper">
									<h2 className="gradient-text">
										Come As You Are. Say What You Want.
									</h2>
									<p>No filters. No fluff. No pressure.</p>
									<p>
										This is your space to define what you want—whether that’s
										companionship, support, or something in between. Every
										connection starts with clear goals and mutual understanding,
										so you’re never stuck guessing.
									</p>
									<p>Just real people, real vibes, and no BS.</p>
									<div className="button_width">
										<h4>Join Now</h4>
										<Link
											to="/man-registration"
											className="btn-bgtransparent under-line me-2"
										>
											<span className="pe-2">
												<img src={outline1} alt="outline1" />
											</span>
											men
										</Link>
										<Link
											to="/women-registration"
											className="border d-flex align-items-center"
										>
											<span>
												<img src={outline2} alt="outline2" />
											</span>
											women
										</Link>
									</div>
								</div>

								{/* Slide 3 */}
								<div className="text_wrapper what-sets-us-apart">
									<h2 className="gradient-text mb-2">
										What Sets Us Apart? It’s All About Clarity, Consent &
										Choice.
									</h2>

									<div className="point-box mb-4">
										<h4 className="text-white">
											1. Straightforward Talkers Welcome
										</h4>
										<p>
											We built this space for people who are tired of ghosting,
											breadcrumbing, and vague intentions. Here, honesty isn’t
											awkward—it’s the norm. Say what you’re into. Say what
											you’re not. No shame in knowing your needs.
										</p>
									</div>

									<div className="point-box mb-4">
										<h4 className="text-white">2. Respect Is Non-Negotiable</h4>
										<p>
											Great connections don’t happen without respect. Every
											interaction here is based on mutual agreement and open
											communication. Your boundaries matter— and so do theirs.
										</p>
									</div>

									<div className="point-box">
										<h4 className="text-white">3. Ditch the Dating Template</h4>
										<p>
											One-size-fits-all dating? Boring. Not everyone wants the
											same thing, and that’s the point. Whether you’re exploring
											mentorship, support-based connections, or something
											more—this is your space to define it.
										</p>
									</div>
									<div className="button_width">
										<h4>Join Now</h4>
										<Link
											to="/man-registration"
											className="btn-bgtransparent under-line me-2"
										>
											<span className="pe-2">
												<img src={outline1} alt="outline1" />
											</span>
											men
										</Link>
										<Link
											to="/women-registration"
											className="border d-flex align-items-center"
										>
											<span>
												<img src={outline2} alt="outline2" />
											</span>
											women
										</Link>
									</div>
								</div>
							</Slider>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Journeyoflove;
