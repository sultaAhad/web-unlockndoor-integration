import React from "react";
import { motion } from "framer-motion";
import { contactus } from "../Constant/Index";

const Contactus = () => {
	// Animation Variants
	const textVariant = {
		hidden: { opacity: 0, y: 50 },
		visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
	};

	const containerVariant = {
		hidden: {},
		visible: { transition: { staggerChildren: 0.2 } },
	};

	return (
		<motion.section
			id="contectus"
			className="contact_us_sec pb-5 mt-5 mb-5"
			initial="hidden"
			whileInView="visible"
			viewport={{ once: true, amount: 0.2 }}
			variants={containerVariant}
		>
			<div className="container">
				<div className="col-md-12">
					<motion.div className="contact_box" variants={containerVariant}>
						<div className="row align-items-center">
							<div className="col-lg-6">
								<motion.div className="contact_imgbox" variants={textVariant}>
									<img src={contactus} alt="Contact" className="img-fluid" />
								</motion.div>
							</div>
							<div className="col-lg-6">
								<motion.div className="love_sec_head" variants={textVariant}>
									<motion.h5 variants={textVariant}>Contact Us</motion.h5>
									<motion.h2 variants={textVariant}>
										Have a Question or Need Help?{" "}
										<span className="gradient-text ps-2">
											We’re Ready to Listen
										</span>
									</motion.h2>
									<motion.p className="text-white secondary-secondlight-font" variants={textVariant}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
									</motion.p>
								</motion.div>

								<motion.form variants={containerVariant}>
									<div className="row">
										<motion.div className="col-lg-6" variants={textVariant}>
											<div className="form-group input-wrapper">
												<input
													type="text"
													placeholder="First Name"
													required
													className="input_font"
												/>
											</div>
										</motion.div>
										<motion.div className="col-lg-6" variants={textVariant}>
											<div className="form-group input-wrapper">
												<input
													type="text"
													placeholder="Last Name"
													required
													className="input_font"
												/>
											</div>
										</motion.div>
										<motion.div className="col-lg-6" variants={textVariant}>
											<div className="form-group input-wrapper">
												<input
													type="tel"
													placeholder="Contact Number"
													required
													className="input_font"
												/>
											</div>
										</motion.div>
										<motion.div className="col-lg-6" variants={textVariant}>
											<div className="form-group input-wrapper">
												<input
													type="email"
													placeholder="Email Address"
													required
													className="input_font"
												/>
											</div>
										</motion.div>
									</div>

									<motion.div
										className="form-group input-wrapper text_box"
										variants={textVariant}
									>
										<textarea
											className="form_input-2 input_border w-100 input_font"
											rows="4"
											placeholder="Message"
											style={{ borderRadius: "10px" }}
										></textarea>
									</motion.div>

									<motion.div
										className="contact_btn"
										variants={textVariant}
									>
										<button
											type="submit"
											className="mt-2 border text-center px-3 gradient-button"
											style={{ width: "140px" }}
										>
											<span>Submit</span>
										</button>
									</motion.div>
								</motion.form>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</motion.section>
	);
};

export default Contactus;
