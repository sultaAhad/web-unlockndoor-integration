import React from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { dotsimg, outline1, outline2 } from "../Constant/Index";
import { Link } from "react-router-dom";
import { useHomeContentQuery } from "../network/services/HelpServices";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Banner() {
	const [ref, inView] = useInView({
		threshold: 0.2,
		triggerOnce: true,
	});

	const { data: homePageContent, isLoading } = useHomeContentQuery();
	const HomePageData = homePageContent?.data?.sectionOne;
	console.log(homePageContent);

	return (
		<section className="banner_sec py-5" ref={ref}>
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
								{/* Subtitle */}
								<h5>
									{isLoading ? (
										<Skeleton width={250} />
									) : (
										HomePageData?.page_subtitle
									)}
								</h5>

								{/* Meta Keywords Heading */}
								<h2>
									{isLoading ? (
										<Skeleton width={300} height={30} />
									) : (
										HomePageData?.meta_keywords?.map((word, index) => (
											<span key={index} className="gradient-text me-2">
												{word}
											</span>
										))
									)}
								</h2>

								{/* Content */}
								<p>
									{isLoading ? <Skeleton count={3} /> : HomePageData?.content}
								</p>
								<p>
									{isLoading ? <Skeleton count={2} /> : HomePageData?.content_2}
								</p>

								{/* Subtitle 2 */}
								<h4 className="text-white mb-3 secondary-secondmedium-font">
									<span className="gradient-text">
										{isLoading ? (
											<Skeleton width={200} />
										) : (
											HomePageData?.subtitle_2
										)}
									</span>
								</h4>

								{/* Buttons */}
								<motion.div
									className="button_width"
									initial={{ opacity: 0, y: 50 }}
									animate={inView ? { opacity: 1, y: 0 } : {}}
									transition={{ duration: 0.8, delay: 0.3 }}
								>
									{isLoading ? (
										<div className="d-flex gap-3">
											<Skeleton width={100} height={40} />
											<Skeleton width={100} height={40} />
											<Skeleton width={100} height={40} />
										</div>
									) : (
										<>
											<Link className="wrapper-join">
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
											<Link className="border" to="/women-registration">
												<span>
													<img src={outline2} alt="outline2" />
												</span>
												women
											</Link>
										</>
									)}
								</motion.div>
							</div>
						</motion.div>
					</div>

					{/* Right Section (Dynamic Images) */}
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
									{isLoading ? (
										<Skeleton height={200} />
									) : (
										<img
											src={HomePageData?.image_url}
											alt="banner_one__img"
											className="img-fluid"
										/>
									)}
								</motion.div>
								<motion.div
									className="img_wrapper"
									whileHover={{ scale: 1.05 }}
								>
									{isLoading ? (
										<Skeleton height={200} />
									) : (
										<img
											src={HomePageData?.image2_url}
											alt="banner_two__img"
											className="img-fluid"
										/>
									)}
								</motion.div>
							</div>
							<div className="col-md-6">
								<motion.div
									className="img_wrapper second_box"
									whileHover={{ scale: 1.05 }}
								>
									{isLoading ? (
										<Skeleton height={400} />
									) : (
										<img
											src={HomePageData?.image3_url}
											alt="banner_three__img"
											className="banner_img_3 img-fluid"
										/>
									)}
									{!isLoading && (
										<div className="back_dots_img">
											<img src={dotsimg} alt="dots_img" />
										</div>
									)}
								</motion.div>
							</div>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Banner;
