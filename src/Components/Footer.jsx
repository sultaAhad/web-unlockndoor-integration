import React from "react";
import { map, p5, phone, weblogo } from "../Constant/Index";
import { Link } from "react-router-dom";
import { useSettingContentQuery } from "../network/services/HelpServices";

function Footer() {
	const { data: SettingpageContent, isLoading } = useSettingContentQuery();
	const settingPageData = SettingpageContent?.response?.data;
	console.log(settingPageData, "asdasd");

	if (isLoading) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<section className="footer_sec">
				<div className="container">
					<div className="row">
						<div className="col-md-3">
							<div className="footer_widget widget1">
								<div className="footer_logo">
									{/* {settingPageData?.logo_url && (
										<img
											src={settingPageData.logo_url}
											alt="logo"
											className="img-fluid mb-3 wrapperlogo "
										/>
									)} */}
									<h2 className="text-white">
										{settingPageData?.footer_title?.split(" ")[0]}{" "}
										<span className="gradient-text">
											{settingPageData?.footer_title?.replace(
												settingPageData?.footer_title?.split(" ")[0],
												"",
											)}
										</span>
									</h2>
									<div className="text_wrapper">
										<p>{settingPageData?.footer_sentence}</p>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-1"></div>
						<div className="col-md-2">
							<div className="footer_widget widget2">
								<div className="footer_head">
									<h3>quick links</h3>
									<div className="footer_ul">
										<ul>
											<li>
												<Link to="/#about-section">About us</Link>
											</li>
											<li>
												<Link to="/#realitysec">Testimonials </Link>
											</li>
											<li>
												<Link to="/#contectus">Contact Us</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-2">
							<div className="footer_widget widget2">
								<div className="footer_head">
									<h3>Help & Support</h3>
									<div className="footer_ul">
										<ul>
											<li>
												<Link to="/privacy-policy">Privacy Policy</Link>
											</li>
											<li>
												<Link to="/terms-condition">Terms & Conditions</Link>
											</li>
											<li>
												<Link to="/help-support">Help & Support</Link>
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
						<div className="col-md-1"></div>

						<div className="col-md-3">
							<div className="footer_widget widget2">
								<div className="footer_head">
									<h3>Contact Info</h3>
									<div className="footer_ul">
										<div className="footer_map_text">
											<div className="map_img">
												<img src={map} alt="map_img" />
											</div>
											<div className="map_text">
												<p>{settingPageData?.address}</p>
											</div>
										</div>

										<div className="footer_map_text pt-3">
											<div className="map_img">
												<img src={phone} alt="map_img" />
											</div>
											<div className="map_text">
												<p>
													<Link to={`tel:${settingPageData?.contact_phone}`}>
														Phone: {settingPageData?.contact_phone}
													</Link>
												</p>
											</div>
										</div>

										<div className="footer_map_text pt-3">
											<div className="map_img">
												<img src={p5} alt="map_img" />
											</div>
											<div className="map_text">
												<p>
													<Link to={`mailto:${settingPageData?.contact_email}`}>
														{settingPageData?.contact_email}
													</Link>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="row pt-5">
						<div className="col-md-12">
							<div className="dv_copy_right">
								<p>{settingPageData?.copyright}</p>{" "}
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}

export default Footer;
