import React from "react";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer";

function Privacypolicy() {
	// common style for all text content to be white
	const whiteTextStyle = { color: "#fff" };

	return (
		<>
			<Header />

			{/* Privacy Policy Section */}
			<section className="term_sec">
				<div className="container" style={whiteTextStyle}>
					<div className="terms_head">
						<h2 className="gradient-text">Privacy Policy</h2>
					</div>
					<div className="row">
						<div className="col-md-12">
							<div className="terms_para" style={whiteTextStyle}>
								<p>
									At <span className="gradient-text"> UnlockNthedoor, </span> user privacy and data protection are taken
									seriously. This Privacy Policy outlines how information is
									collected, used, shared, and safeguarded. By using the
									platform, visitors and registered users agree to the practices
									described here.
								</p>

								<h4 className="gradient-text" style={{ color: "#fff" }}>2. What We Collect</h4>
								<p style={{ color: "#fff" }}>
									We collect data to support user experience, safety, and system
									functionality.
								</p>
								<p style={{ color: "#fff", fontWeight: "bold" }}>
									Information you provide:
								</p>
								<ul style={{ color: "#fff" }}>
									<li>
										Name, email address, location, profile photos, personal
										preferences, and optional details like occupation or
										lifestyle choices.
									</li>
									<li>
										Verification of data (e.g., photos or identification) when
										users request extra security features.
									</li>
								</ul>

								<p style={{ color: "#fff", fontWeight: "bold" }}>
									Information collected automatically:
								</p>
								<ul style={{ color: "#fff" }}>
									<li>
										IP address, device type, browser information, usage
										patterns, time spent, and clicked pages.
									</li>
								</ul>

								<p style={{ color: "#fff", fontWeight: "bold" }}>
									Optional data via third parties:
								</p>
								<ul style={{ color: "#fff" }}>
									<li>
										If using certain identity verification services, some data
										may be collected through licensed vendors working with
										UnlockNthedoor.
									</li>
								</ul>

								<h4 className="gradient-text" style={whiteTextStyle}>
									3. Why We Collect It
								</h4>
								<ul>
									<li>Deliver account access and profile visibility</li>
									<li>Match users based on preferences</li>
									<li>Improve feature performance</li>
									<li>Detect and prevent fraud or harmful behavior</li>
									<li>Process transactions for subscription services</li>
									<li>Offer responsive customer support</li>
								</ul>

								<h4 className="gradient-text" style={whiteTextStyle}>
									4. Who We Share It With
								</h4>
								<p>
									UnlockNthedoor does not sell personal information. Data may be
									shared only when necessary:
								</p>
								<ul>
									<li>
										With service providers (payment, verification, hosting,
										analytics)
									</li>
									<li>
										For legal compliance (e.g., court orders, investigations)
									</li>
									<li>
										With user consent (when sharing info with another user or
										using a third-party feature)
									</li>
								</ul>

								<h4 className="gradient-text" style={whiteTextStyle}>
									5. Cookies and Tracking
								</h4>
								<p>
									{" "}
									<span className="gradient-text"> UnlockNthedoor </span> uses
									cookies to:
								</p>
								<ul>
									<li>Keep users logged in</li>
									<li>Remember preferences</li>
									<li>Analyze performance</li>
									<li>Support safety mechanisms</li>
								</ul>
								<p>
									Users can manage cookie preferences through browser settings.
								</p>

								<h4 className="gradient-text" style={whiteTextStyle}>
									6. Data Retention and Deletion
								</h4>
								<p>
									Data is retained while accounts are active. Users may request
									deletion, which removes profile details, messages, and other
									stored data unless required for legal or safety obligations.
								</p>

								<h4 className="gradient-text" style={whiteTextStyle}>
									7. Security Measures
								</h4>
								<ul>
									<li>Secure encryption for login and transactions</li>
									<li>Regular security audits</li>
									<li>Strict access controls</li>
									<li>Third-party vulnerability testing</li>
								</ul>

								<h4 className="gradient-text" style={whiteTextStyle}>
									8. Your Rights
								</h4>
								<p>
									Depending on location, users may request access to their data,
									request corrections or deletions, or object to certain
									processing.
								</p>

								<h4 className="gradient-text" style={whiteTextStyle}>
									9. Policy Updates
								</h4>
								<p>
									This policy may be updated occasionally. Users will be
									informed via the website or email.
								</p>

								<h4 className="gradient-text" style={whiteTextStyle}>
									10. Contact
								</h4>
								<p>
									Questions about privacy can be directed to{" "}
									<a
										className="gradient-text"
										href="mailto:support@UnlockNthedoor.com"
										style={{ color: "#fff", textDecoration: "underline" }}
									>
										support@UnlockNthedoor.com
									</a>
									.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}

export default Privacypolicy;
