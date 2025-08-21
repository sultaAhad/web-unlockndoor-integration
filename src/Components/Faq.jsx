import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Aos from "aos";
import { useFaqsContentQuery, useHomeContentQuery } from "../network/services/HelpServices";

// ✅ Skeleton loader
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Faq() {
	const [inViewRef, inView] = useInView({
		triggerOnce: true,
		threshold: 0.1,
	});

	useEffect(() => {
		Aos.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
			offset: 120,
		});
	}, []);

	// FAQs
	const { data, isLoading, isError } = useFaqsContentQuery();
	const faqData = data?.response?.data ?? [];

	// Home content (sectionFour)
	const { data: homePageContent, isLoading: isHomeLoading } = useHomeContentQuery();
	const HomePageData = homePageContent?.data?.sectionFour;

	return (
		<section className="our_faq_sec" ref={inViewRef}>
			<motion.div
				className="container"
				initial={{ opacity: 0, y: 50 }}
				animate={{
					opacity: inView ? 1 : 0,
					y: inView ? 0 : 50,
					scale: inView ? 1 : 0.9,
				}}
				transition={{ duration: 0.8, ease: "easeOut" }}
			>
				<div className="row">
					{/* Left Image */}
					<motion.div
						className="col-md-6"
						data-aos="fade-right"
						initial={{ opacity: 0, x: -100 }}
						animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : -100 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<div className="img_wrapper">
							{isHomeLoading ? (
								<Skeleton height={400} width="100%" />
							) : (
								<img
									src={HomePageData?.image_url}
									alt="FAQ illustration"
									className="img-fluid"
								/>
							)}
						</div>
					</motion.div>

					{/* Right FAQ */}
					<motion.div
						className="col-md-6 for_back_color"
						data-aos="fade-left"
						initial={{ opacity: 0, x: 100 }}
						animate={{ opacity: inView ? 1 : 0, x: inView ? 0 : 100 }}
						transition={{ duration: 0.8, ease: "easeOut" }}
					>
						<div className="faq_wrapper">
							{/* Header */}
							<motion.div
								className="faq_heading"
								data-aos="fade-up"
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
							>
								{isHomeLoading ? (
									<>
										<Skeleton height={30} width="60%" className="mb-2" />
										<Skeleton height={20} width="90%" />
									</>
								) : (
									<>
										<h3>{HomePageData?.page_subtitle}</h3>
										<p>{HomePageData?.content}</p>
									</>
								)}
							</motion.div>

							{/* FAQ Content */}
							<motion.div
								className="accordion"
								id="accordionExample"
								data-aos="fade-up"
								initial={{ opacity: 0, y: 50 }}
								animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 50 }}
								transition={{ duration: 0.8, ease: "easeOut" }}
							>
								{isLoading ? (
									<>
										{Array.from({ length: 5 }).map((_, idx) => (
											<div className="accordion-item mb-3" key={idx}>
												<div className="accordion-header">
													<Skeleton height={20} width="80%" />
												</div>
												<div className="accordion-body">
													<Skeleton count={3} />
												</div>
											</div>
										))}
									</>
								) : isError ? (
									<p className="text-danger">
										Failed to load FAQs. Please try again later.
									</p>
								) : faqData.length === 0 ? (
									<p className="text-muted">No FAQs available yet.</p>
								) : (
									faqData.map((item, index) => (
										<div className="accordion-item" key={index}>
											<h2 className="accordion-header" id={`heading${index}`}>
												<button
													className="accordion-button collapsed"
													type="button"
													data-bs-toggle="collapse"
													data-bs-target={`#collapse${index}`}
													aria-expanded="false"
													aria-controls={`collapse${index}`}
												>
													{item.question}
												</button>
											</h2>
											<div
												id={`collapse${index}`}
												className={`accordion-collapse collapse ${
													index === 0 ? "show" : ""
												}`}
												aria-labelledby={`heading${index}`}
												data-bs-parent="#accordionExample"
											>
												<div className="accordion-body">{item.answer}</div>
											</div>
										</div>
									))
								)}
							</motion.div>
						</div>
					</motion.div>
				</div>
			</motion.div>
		</section>
	);
}

export default Faq;
