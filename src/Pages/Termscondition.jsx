import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";
import { useTermsAndConditionQuery } from "../network/services/AuthServices";

function Termscondition() {
	const { data, isLoading, error, refetch } = useTermsAndConditionQuery();

	const pageData = data?.response?.data;

	return (
		<>
			<Header />

			<section className="term_sec">
				<div className="container" style={{ color: "#fff" }}>
					<div className="terms_head">
						{isLoading && (
							<h2 style={{ color: "#fff", textAlign: "center" }}>Loading...</h2>
						)}

						{error && (
							<h2 style={{ color: "red", textAlign: "center" }}>
								Failed to load Terms & Conditions
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
								{pageData.page_title || "Terms & Conditions"}
							</h2>
						)}
					</div>

					{/* ✅ Subtitle */}
					{pageData?.page_subtitle && (
						<p style={{ color: "#fff" }}>{pageData.page_subtitle}</p>
					)}

					{/* ✅ Main Content from API */}
					{pageData?.content ? (
						<div
							className="terms_para"
							dangerouslySetInnerHTML={{ __html: pageData.content }}
						/>
					) : (
						!isLoading && <p style={{ color: "#fff" }}>No content available.</p>
					)}
				</div>
			</section>

			<Footer />
		</>
	);
}

export default Termscondition;
