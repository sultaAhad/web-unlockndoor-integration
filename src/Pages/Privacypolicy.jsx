import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { usePrivacyPolicyQuery } from "../network/services/AuthServices";

function Privacypolicy() {
	const { data, isLoading, error, refetch } = usePrivacyPolicyQuery();
	const pageData = data?.response?.data;

	return (
		<>
			<Header />

			<section className="term_sec">
				<div className="container" style={{ color: "#fff" }}>
					<div className="terms_head">
						{isLoading && <h2 style={{ textAlign: "center" }}>Loading...</h2>}

						{error && (
							<h2 style={{ color: "red", textAlign: "center" }}>
								Failed to load Privacy Policy
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
							<h2 className="gradient-text">
								{pageData.page_title || "Privacy Policy"}
							</h2>
						)}
					</div>

					{/* ✅ Subtitle */}
					{pageData?.page_subtitle && <p>{pageData.page_subtitle}</p>}

					{/* ✅ Render main HTML content */}
					{pageData?.content ? (
						<div
							className="terms_para"
							dangerouslySetInnerHTML={{ __html: pageData.content }}
						/>
					) : (
						!isLoading && <p>No content available.</p>
					)}
				</div>
			</section>

			<Footer />
		</>
	);
}

export default Privacypolicy;
