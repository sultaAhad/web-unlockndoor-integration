import React, { useEffect, useState } from "react";
import {
	alert_icon,
	edit,
	innerpages1,
	manproimage2,
	manproimage3,
	massagewrapper,
	message,
	notification,
	profilebanner,
	profileimg,
	tick,
} from "../../Constant/Index";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import ProfileHeader from "../../Components/ProfileHeader";
import { useSelector } from "react-redux";

function Membership() {
  const [activeTab, setActiveTab] = useState("men");
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showPackageModal, setShowPackageModal] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const [subscriptionPackage, setSubscriptionPackage] = useState(user?.package);
  const descriptions = JSON.parse(subscriptionPackage?.description);

  useEffect(() => {
    Aos.init({ duration: 1000, once: true });
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

      <section className="profile_sec mb-5" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <ProfileHeader />
            <div className="col-md-12 pt-5 for-extra-space">
              <ProfileNavbartwo />
            </div>

            <section className="pack_sec p-0 py-5">
              <div className="container">
                <div className="row mt-3">
                  {subscriptionPackage != null && (
                    <div className="col-md-4">
                      <div className="package_card card-hri-er px-3 py-4  main_bg rounded">
                        <div className="pack_heading text-center px-3 border-bottom py-3 border-white">
                          <h3 className="text-white font_semibold font_level3">
                            {subscriptionPackage.title}
                          </h3>
                          <p className="text-white font_reg font_level4 mb-0">
                            ${subscriptionPackage.price}
                          </p>
                        </div>
                        <div className="pack_bullets">
                          <ul className="ps-0 py-3">
                            {descriptions &&
                              descriptions.length > 0 &&
                              descriptions.map((benefit, benefitIndex) => (
                                <li
                                  key={benefitIndex}
                                  className="bullet_Wrapper d-flex align-items-baseline  py-2"
                                >
                                  <div className="bullet_img">
                                    <img
                                      src={tick}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                  <div className="bullet_point text-white font_reg font_level4">
                                    {benefit}
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="pack_btns d-flex  gap-2"></div>
                        <div className="pack_buttons">
                          <button
                            className="btn rounded-pill py-3 px-4 bg-white  font_reg text-capitalize w-100 my-3"
                            data-bs-toggle="modal"
                            data-bs-target="#membershipcancelmodal"
                          >
                            Cancel Subscription
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      <div className="membershipcancel_modal">
        <div>
          {/* Bootstrap Modal */}
          <div
            className="modal fade"
            id="membershipcancelmodal"
            tabIndex="-1"
            aria-labelledby="membershipcancelModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered bg-transparent border-0 success__dialog">
              <div className="modal-content bg-transparent border-0">
                <div className="modal-head  d-flex justify-content-center">
                  <div className="congrat_img position-relative top-0">
                    <img src={alert_icon} alt="" className="img-fluid" />
                  </div>
                </div>
                <div className="modal-body modal__body  congrat-body text-center pt-4 bg-white position-relative ">
                  <h3 className="font_semibold font_level3 text-danger mt-3 mb-2 text-capitalize">
                    cancel membership
                  </h3>
                  <p className="font_reg  text-dark my-2">
                    Are you sure you want <br />
                    to cancel membership
                  </p>
                </div>
                <div className="modal_btn modal__withdraw_btn bg-white d-flex  ">
                  <button
                    type="button"
                    className="btn   btn btn-secondary   rounded-0 text-center text-capitalize text-white py-3 w-50 bg-danger "
                    data-bs-dismiss="modal"
                  >
                    yes
                  </button>
                  <button
                    type="button"
                    className="btn  withdraw_btn_2  btn btn-secondary  rounded-0 text-center text-capitalize py-3 w-50"
                    data-bs-dismiss="modal"
                  >
                    no
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Membership;
