import React, { useEffect, useState } from "react";
import {
  alert_icon,
  blacktick,
  edit,
  innerpages1,
  manproimage2,
  manproimage3,
  massagewrapper,
  message,
  notification,
  womenproimg,
  womenproimg1,
} from "../../Constant/Index";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";
import ProfileNavbar from "../../Components/ProfileNavbar";
import PackageSelectionModal from "../../Components/PackageSelectionModal";
import ProfileHeader from "../../Components/ProfileHeader";
import { useSelector } from "react-redux";
import { useLazyCancelWomenPackageQuery } from "../../network/services/WomanAuth";
import { Spinner } from "react-bootstrap";

function MembershipWomen() {
  const [activeTab, setActiveTab] = useState("men");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

  const { user } = useSelector((state) => state.auth);
  const [subscriptionPackage, setSubscriptionPackage] = useState(user?.package);
  const descriptions = JSON.parse(subscriptionPackage?.description);
  const [triggerFunction, { isLoading: isProcessing }] =
    useLazyCancelWomenPackageQuery();

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
  console.log(isProcessing);

  return (
    <>
      <Header />

      <section className="profile_sec" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <ProfileHeader />
            <div className="col-md-12 pt-5 for-extra-space">
              <ProfileNavbar />
            </div>

            <section className="pack_sec1 mb-5 pb-5 py-5">
              <div className="container">
                <div className="row mt-3">
                  {subscriptionPackage != null && (
                    <div className="col-md-5">
                      <div className="package_card px-3 py-4  extra-bg-14 rounded">
                        <div className="pack_heading border-bottom1 text-center px-3  py-3 border-white">
                          <h3 className="dark-color font_semibold font_level3">
                            {subscriptionPackage.title} $
                            {subscriptionPackage.price}
                          </h3>
                          <p className="dark-color font_reg font_level4 mb-0">
                            {subscriptionPackage.duration} Months
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
                                      src={blacktick}
                                      alt=""
                                      className="img-fluid"
                                    />
                                  </div>
                                  <div className="bullet_point dark-color font_reg font_level4">
                                    {benefit}
                                  </div>
                                </li>
                              ))}
                          </ul>
                        </div>
                        <div className="pack_btns d-flex  gap-2"></div>
                        <div className="pack_buttons">
                          <button
                            className="btn rounded-pill text-white py-3 px-4 extra-bg-1  font_reg text-capitalize w-100 my-3"
                            onClick={() => {
                              setIsModalOpen(false);
                              setIsSecondModalOpen(true);
                            }}
                          >
                            Upgrade Membership
                          </button>
                        </div>
                        <div className="pack_buttons">
                          <button
                            className="btn rounded-pill py-3 px-4 bg-white  font_reg text-capitalize w-100 "
                            data-bs-toggle="modal"
                            data-bs-target="#membershipcancelmodal"
                          >
                            {isProcessing ? <Spinner /> : "Cancel Subscription"}
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
                    onClick={() => triggerFunction()}
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
      <PackageSelectionModal
        isOpen={isSecondModalOpen}
        showCloseBtn={true}
        onRequestClose={() => setIsSecondModalOpen(false)}
      />
      <Footer />
    </>
  );
}

export default MembershipWomen;
