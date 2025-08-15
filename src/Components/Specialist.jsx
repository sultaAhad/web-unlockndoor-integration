import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { outline1, outline2 } from "../Constant/Index";

function Specialist() {
	// Animation variants
	const textVariant = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
	};

	const containerVariant = {
		hidden: {},
		visible: { transition: { staggerChildren: 0.2 } },
	};

	return (
		<>
			<motion.section
				className="specialist_Sec"
				initial="hidden"
				whileInView="visible"
				viewport={{ once: true, amount: 0.2 }}
				variants={containerVariant}
			>
				<div className="container">
					<div className="row">
						<div className="col-md-12">
							<motion.div className="dv_wrapper" variants={containerVariant}>
								<motion.div className="text_wrapper" variants={textVariant}>
									<motion.h2 variants={textVariant}>
										Built for Real People, Real Vibes,
										<span className="gradient-text"> and Zero BS</span>{" "}
									</motion.h2>
									<motion.p variants={textVariant}>
										No filters. No fluff. Just a space where clear goals meet
										honest intentions.{" "}
									</motion.p>
									<motion.p variants={textVariant}>
										Whether you’re looking for companionship, lifestyle support,
										or something that
									</motion.p>
									<motion.p variants={textVariant}>
										fits your flow—you call the shots, no pressure no
										pretending.
									</motion.p>
								</motion.div>
							</motion.div>
							<motion.div
								className="lets_img text-center"
								variants={textVariant}
							>
								<div className="button_width">
									<motion.h4 variants={textVariant}>Join Now</motion.h4>
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
							</motion.div>
						</div>
					</div>
				</div>
			</motion.section>
		</>
	);
}

export default Specialist;
