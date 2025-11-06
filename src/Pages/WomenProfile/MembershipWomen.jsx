import React, { useEffect, useState } from "react";
import { alert_icon, blacktick, innerpages1 } from "../../Constant/Index";
import { Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";
import ProfileNavbar from "../../Components/ProfileNavbar";
import PackageSelectionModal from "../../Components/PackageSelectionModal";
import ProfileHeader from "../../Components/ProfileHeader";
import { useSelector } from "react-redux";
import { useLazyCancelWomenPackageQuery } from "../../network/services/WomanAuth";
import Swal from "sweetalert2"; // ✅ SweetAlert added

function MembershipWomen() {
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const [subscriptionPackage, setSubscriptionPackage] = useState(user?.package);
  const descriptions = JSON.parse(subscriptionPackage?.description || "[]");

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

  // ✅ Cancel Membership function with SweetAlert
  const handleCancelMembership = async () => {
    try {
      const res = await triggerFunction().unwrap();

      Swal.fire({
        title: "Cancelled!",
        text: "Your membership has been cancelled successfully.",
        icon: "success",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        window.location.reload(); // refresh page or redirect if needed
      });
    } catch (error) {
      Swal.fire({
        title: "Error",
        text: error?.data?.message || "Failed to cancel membership.",
        icon: "error",
        confirmButtonColor: "#d33",
      });
    }
  };

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
                      <div className="package_card px-3 py-4 extra-bg-14 rounded">
                        <div className="pack_heading border-bottom1 text-center px-3 py-3 border-white">
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
                            {descriptions.length > 0 &&
                              descriptions.map((benefit, benefitIndex) => (
                                <li
                                  key={benefitIndex}
                                  className="bullet_Wrapper d-flex align-items-baseline py-2"
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

                        {user?.has_women_package_details?.cancel_at == null ? (
                          <>
                            <div className="pack_buttons">
                              <button
                                className="btn rounded-pill text-white py-3 px-4 extra-bg-1 font_reg text-capitalize w-100 my-3"
                                onClick={() => {
                                  setIsSecondModalOpen(true);
                                }}
                              >
                                Upgrade Membership
                              </button>
                            </div>

                            <div className="pack_buttons">
                              <button
                                className="btn rounded-pill py-3 px-4 bg-white font_reg text-capitalize w-100"
                                data-bs-toggle="modal"
                                data-bs-target="#membershipcancelmodal"
                              >
                                {isProcessing ? (
                                  <Spinner />
                                ) : (
                                  "Cancel Subscription"
                                )}
                              </button>
                            </div>
                          </>
                        ) : (
                          <>
                            <p className="bg-body px-3 py-2 text-center text-danger">
                              You cancelled your package on{" "}
                              {user?.has_women_package_details?.cancel_at}.
                              Don't worry - you can still enjoy all benefits
                              until your subscription period ends.
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>

      {/* ✅ Cancel Modal */}
      <div className="membershipcancel_modal">
        <div>
          <div
            className="modal fade"
            id="membershipcancelmodal"
            tabIndex="-1"
            aria-labelledby="membershipcancelModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered bg-transparent border-0 success__dialog">
              <div className="modal-content bg-transparent border-0">
                <div className="modal-head d-flex justify-content-center">
                  <div className="congrat_img position-relative top-0">
                    <img src={alert_icon} alt="" className="img-fluid" />
                  </div>
                </div>

                <div className="modal-body modal__body congrat-body text-center pt-4 bg-white position-relative">
                  <h3 className="font_semibold font_level3 text-danger mt-3 mb-2 text-capitalize">
                    Cancel membership
                  </h3>
                  <p className="font_reg text-dark my-2">
                    Are you sure you want <br />
                    to cancel your membership?
                  </p>
                </div>

                <div className="modal_btn modal__withdraw_btn bg-white d-flex">
                  <button
                    type="button"
                    onClick={handleCancelMembership}
                    className="btn rounded-0 text-center text-capitalize text-white py-3 w-50 bg-danger"
                    data-bs-dismiss="modal"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    className="btn rounded-0 text-center text-capitalize py-3 w-50"
                    data-bs-dismiss="modal"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Upgrade Modal (already with SweetAlert inside PackageSelectionModal.jsx) */}
      <PackageSelectionModal
        isOpen={isSecondModalOpen}
        showCloseBtn={true}
        action={"upgrade"}
        onRequestClose={() => setIsSecondModalOpen(false)}
      />

      <Footer />
    </>
  );
}

export default MembershipWomen;
