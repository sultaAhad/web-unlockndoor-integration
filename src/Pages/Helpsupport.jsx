import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useHelpAndSupportQuery } from "../network/services/AuthServices";

function Helpsupport() {
	const { data, isLoading, error, refetch } = useHelpAndSupportQuery();
	const pageData = data?.response?.data;

	return (
		<>
			<Header />

			<section className="term_sec faqs___sec">
				<div className="container">
					<div className="col-lg-12">
						<div className="terms_head">
							{isLoading && (
								<div>
									{/* Skeleton Title */}
									<h2>
										<Skeleton
											height={35}
											width={250}
											baseColor="#444"
											highlightColor="#666"
										/>
									</h2>

									{/* Skeleton Subtitle */}
									<p>
										<Skeleton
											height={20}
											width={400}
											baseColor="#333"
											highlightColor="#555"
										/>
									</p>
								</div>
							)}

							{error && (
								<h2 style={{ color: "red", textAlign: "center" }}>
									Failed to load Help & Support
									<br />
									<button
										onClick={refetch}
										className="btn btn-sm btn-outline-light mt-2"
									>
										Retry
									</button>
								</h2>
							)}

							{!isLoading && pageData && (
								<>
									<h2 style={{ color: "#fff" }}>
										<span className="gradient-text">
											{pageData.page_title || "Help & Support"}
										</span>
									</h2>
									{pageData.page_subtitle && (
										<p style={{ color: "#fff" }}>{pageData.page_subtitle}</p>
									)}
								</>
							)}
						</div>

						{/* ✅ Content Skeleton */}
						{isLoading && (
							<div className="terms_para">
								<Skeleton
									count={6} // kitne lines dikhaane hai
									height={18}
									style={{ marginBottom: "10px" }}
									baseColor="#333"
									highlightColor="#555"
								/>
							</div>
						)}

						{!isLoading && pageData?.content ? (
							<div
								className="terms_para"
								dangerouslySetInnerHTML={{ __html: pageData.content }}
							/>
						) : (
							!isLoading && (
								<p style={{ color: "#aaa", textAlign: "center" }}>
									No help & support content available.
								</p>
							)
						)}
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}

export default Helpsupport;
