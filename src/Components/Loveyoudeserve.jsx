import React, { useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { linelwft, outline1, outline2, wrapperfight } from "../Constant/Index";
import { Link } from "react-router-dom";

function Loveyoudeserve() {
	const ref = useRef(null);
	const isInView = useInView(ref, { once: true, margin: "-100px" });

	const variants = {
		hidden: { opacity: 0, y: 100 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 1, ease: "easeOut" },
		},
	};

	// Parallax effect
	const { scrollY } = useScroll();
	const y = useTransform(scrollY, [0, 600], [0, -150]);

	return (
		<motion.section
			ref={ref}
			className="love_you_deserve_sec"
			variants={variants}
			initial="hidden"
			animate={isInView ? "visible" : "hidden"}
			style={{
				backgroundPositionY: y,
			}}
		>
			<div className="container">
				<div className="love_sec_head">
					<h5>Who We Are?</h5>
					<h2>
						No-Nonsense{" "}
						<span className="gradient-text">Zone for Honest Connections</span>
					</h2>
				</div>

				<div className="row">
					<div className="col-md-12">
						<div className="dv_wrapper">
							<div className="dv_img_wrapper">
								{/* Cards */}
								<div className="love_head love_head_1">
									<h3>Made for Straight Shooters</h3>
									<p>
										Tired of decoding texts and guessing intentions? Same. This
										space is for people who say what they mean and mean what
										they say—from the first message to the real deal.
									</p>
									<div className="love_number love_number_1">
										<h1>01</h1>
									</div>
								</div>

								<div className="love_head love_head_2">
									<h3>Where Respect Sets the Vibe</h3>
									<p>
										Real chemistry needs real clarity. That’s why every
										connection here is built on mutual understanding and
										respect—no pressure, no assumptions, just honest alignment.
									</p>
									<div className="love_number love_number_2">
										<h1>02</h1>
									</div>
								</div>

								<div className="love_head love_head_3">
									<h3>Because Not Everyone Wants the Same Thing</h3>
									<p>
										Cookie-cutter dating? Not our style. Whether you’re after
										deep convos, chill company, or something in-between, this is
										your space to define connection your way.
									</p>
									<div className="love_number love_number_3">
										<h1>03</h1>
									</div>
								</div>

								<div className="love_head love_head_4">
									<h3>Boundaries? Non-Negotiable.</h3>
									<p>
										We’re big on consent, clarity, and keeping things fair.
										Manipulation, ghosting, or shady behavior? Not welcome. This
										is a grown space—for grown energy only.
									</p>
									<div className="love_number love_number_4">
										<h1>04</h1>
									</div>
								</div>

								<div className="love_head love_head_6">
									<div className="love_number love_number_6">
										<h1>05</h1>
									</div>
									<div className="leeddd">
										<h3>Clear Intentions. Real Results.</h3>
										<p>
											No games. No guessing. Just straightforward connections
											where everyone’s on the same page—and the drama stays at
											the door.
										</p>
									</div>
								</div>

								<img src={wrapperfight} alt="steps" />
							</div>

							<div className="lets_img text-center mt-2 pt-2">
								<h3>Let’s do this together…</h3>
								<div className="button_width mt-4">
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
						</div>
					</div>
				</div>
			</div>
		</motion.section>
	);
}

export default Loveyoudeserve;
