import React, { useEffect } from "react";
import Footer from "../../Components/Footer";
import Header from "../../Components/Header/Header";
import {
	edit,
	innerpages1,
	manproimage2,
	manproimage3,
	massagewrapper,
	men_img,
	men_profile,
	message,
	notification,
	notify_img,
	womenproimg,
	womenproimg1,
} from "../../Constant/Index";
import { Link } from "react-router-dom";
import Aos from "aos";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import ProfileHeader from "../../Components/ProfileHeader";
import Notifications from "../../Components/Notifications";

function WomenNotification() {
  useEffect(() => {
    Aos.init({ duration: 1000, once: true }); // Initialize AOS with options
  }, []);
  useEffect(() => {
    document.body.style.backgroundImage = `url(${innerpages1})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.minHeight = "100vh";

    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);
  return (
		<>
			<Header />

			<section className="profile_sec" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<ProfileHeader showButtons={false} />
					</div>
				</div>
			</section>

			<section className="notification-wrapper">
				<div className="container">
					<div className="row">
						<div className="col-lg-11 mx-auto">
							{/* <Userprofilesetting />
                            <ProfileNavbar /> */}
							<div className="row mt-5 pt-5 mb-5 pb-4">
								<div className="col-lg-12">
									<div className="row">
										<div className="col-xxl-8 col-lg-11 mx-auto">
											<div className="main-membership-plane comment-wrapper ">
												<div className="row border-bottom-color pb-3 mt-3">
													<div className="col-lg-12">
														<h4 className="mb-4 secondary-bold-font text-center text-white level-5 ">
															Notifications
														</h4>
													</div>
												</div>
												<Notifications type={"women"} />
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</>
	);
}

export default WomenNotification;
