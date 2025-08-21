import React from "react";
import { motion } from "framer-motion";
import Webslider from "./Webslider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useHomeContentQuery, useTestemonialContentQuery } from "../network/services/HelpServices";

function Reality() {
	const { data: homePageContent, isLoading } = useHomeContentQuery();
	const HomePageData = homePageContent?.data?.sectionFive;
	return (
		<section className="reality_sec" id="realitysec">
			<div className="container">
				<div className="row">
					{/* Left Column */}
					<div className="col-md-6 p-0">
						<motion.div
							className="reality_head"
							initial={{ opacity: 0, y: 50 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.8 }}
						>
							{isLoading ? (
								<>
									<Skeleton width={150} height={20} />
									<Skeleton width={300} height={30} style={{ marginTop: 10 }} />
									<Skeleton width={280} height={30} style={{ marginTop: 10 }} />
								</>
							) : (
								<>
									<h5>{HomePageData?.page_subtitle || "Customer Feedback"}</h5>
									<h2>
										{HomePageData?.subtitle_1?.split(" ")[0]}{" "}
										<span className="gradient-text">
											{HomePageData?.subtitle_1?.replace(
												HomePageData?.subtitle_1?.split(" ")[0],
												"",
											)}
										</span>
									</h2>
								</>
							)}
						</motion.div>

						<motion.div
							initial={{ opacity: 0, x: -50 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.8 }}
						>
							{isLoading ? (
								<Skeleton height={250} borderRadius={8} />
							) : (
								<Webslider />
							)}
						</motion.div>
					</div>

					{/* Right Column */}
					<div className="col-md-6 p-0">
						<motion.div
							className="boy_img_wrapper"
							initial={{ opacity: 0, scale: 0.8 }}
							whileInView={{ opacity: 1, scale: 1 }}
							transition={{ duration: 0.8 }}
						>
							{isLoading ? (
								<Skeleton height={400} borderRadius={8} />
							) : (
								<img
									src={HomePageData?.image_url}
									alt="Customer Feedback"
									className="img-fluid"
								/>
							)}
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default Reality;
