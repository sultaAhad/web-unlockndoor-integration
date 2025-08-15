import React, { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
	banner1,
	banner2,
	banner3,
	dotsimg,
	outline1,
	outline2,
} from "../Constant/Index";
import { Link } from "react-router-dom";

function Banner() {
	const [ref, inView] = useInView({
		threshold: 0.2, // Trigger when 20% of the component is visible
		triggerOnce: true, // Trigger only once
	});

	return (
		<>
			<section className="banner_sec" ref={ref}>
				<div className="container">
					<div className="row align-items-center">
						{/* Left Section */}
						<div className="col-md-6">
							<motion.div
								className="wrapper"
								initial={{ opacity: 0, x: -50 }}
								animate={inView ? { opacity: 1, x: 0 } : {}}
								transition={{ duration: 0.8 }}
							>
								<div className="text_wrapper">
									<h5>Welcome to Unlock the door</h5>
									<h2>
										<span className="gradient-text">Real Talk.</span> Real
										Vibes.
									</h2>
									<h2>Real Connections. </h2>
									<p>
										Tired of swiping through the same small talk and mixed
										signals? Welcome to{" "}
										<span className="gradient-text"> UnlockNthedoors—</span>
										where honesty is sexy, and intentions are crystal clear.
										Whether you’re craving meaningful connection, bold
										companionship, or a no-pressure arrangement that works for
										you, we’re here to make it happen—without the games.
									</p>
									<p>
										It’s not about chasing fantasies. It’s about finding real
										people who match your vibe and respect your terms. So tell
										us what you want. Own your desires. And connect with someone
										who’s on the same page—consent-first, no confusion, no BS.
									</p>
									<h4 className="text-white mb-3 secondary-secondmedium-font">
										<span className="gradient-text">Doors open.</span> Masks
										off. Let’s get real.
									</h4>
									<motion.div
										className="button_width"
										initial={{ opacity: 0, y: 50 }}
										animate={inView ? { opacity: 1, y: 0 } : {}}
										transition={{ duration: 0.8, delay: 0.3 }}
									>
										<Link className="wrapper-join">
											{" "}
											<h4>Join Now</h4>
										</Link>
										<Link
											className="btn-bgtransparent under-line"
											to="/man-registration"
										>
											<span>
												<img
													src={outline1}
													alt="outline1"
													className="img-fluid pe-2"
												/>
											</span>{" "}
											men
										</Link>
										<Link
											className="border"
											to="/women-registration"
										>
											<span>
												<img src={outline2} alt="outline2" />
											</span>
											women
										</Link>
									</motion.div>
								</div>
							</motion.div>
						</div>

						{/* Right Section */}
						<div className="col-md-6">
							<motion.div
								className="row"
								initial={{ opacity: 0, scale: 0.8 }}
								animate={inView ? { opacity: 1, scale: 1 } : {}}
								transition={{ duration: 0.8, delay: 0.2 }}
							>
								<div className="col-md-6">
									<motion.div
										className="img_wrapper"
										whileHover={{ scale: 1.05 }}
									>
										<img src={banner1} alt="banner_one__img" />
									</motion.div>
									<motion.div
										className="img_wrapper"
										whileHover={{ scale: 1.05 }}
									>
										<img src={banner2} alt="banner_two__img" />
									</motion.div>
								</div>
								<div className="col-md-6">
									<motion.div
										className="img_wrapper second_box"
										whileHover={{ scale: 1.05 }}
									>
										<img
											src={banner3}
											alt="banner_one_img"
											className="banner_img_3"
										/>
										<div className="back_dots_img">
											<img src={dotsimg} alt="dots_img" />
										</div>
									</motion.div>
								</div>
							</motion.div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Banner;
