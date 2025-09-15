import React from "react";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import { blacktick } from "../Constant/Index";
import { useGetMenPackagesQuery } from "../network/services/ManAuth";
import { useSelector } from "react-redux";

const PackageSelectionModal = ({
  isOpen,
  closeModal,
  onRequestClose,
  showCloseBtn = false,
}) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const navigate = useNavigate();
  const { data, isLoading, error } = useGetMenPackagesQuery();

  // women packages from API
  const packages = data?.response?.data?.women || [];

  if (isLoading) return <p>Loading packages...</p>;
  if (error) return <p>Error loading packages</p>;

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="modal-content wrapper-model-dd"
      overlayClassName="modal-overlay"
    >
      <div className="container py-4">
        {showCloseBtn && (
          <div className="d-flex justify-content-end mb-3">
            <button
              type="button"
              className="btn btn-close"
              aria-label="Close"
              onClick={() => onRequestClose()}
              style={{ fontSize: "1.5rem", background: "none", border: "none" }}
            >
              &times;
            </button>
          </div>
        )}

        <div className="row">
          {packages.map((pkg, index) => {
            let benefits = [];
            try {
              benefits = JSON.parse(pkg.description);
            } catch {
              benefits = [];
            }

            const cssClasses = ["firstclass", "secondclass", "thirdclass"];
            const cssClass = cssClasses[index % cssClasses.length];

            return (
              <div key={pkg.id || index} className="col-md-4 mb-4">
                <div
                  className={`package_card text-white p-3 rounded ${cssClass}`}
                >
                  <div className="text-center border-bottom1 mb-2 pb-2">
                    <h4 className="text-white font_semibold font_level3">
                      {pkg.title} - ${pkg.price} {pkg.id} {user?.package?.id}
                    </h4>
                    <p className="text-white font_reg font_level4 mb-0">
                      {pkg.duration} Days
                    </p>
                    <p className="text-warning font_reg font_level5 mb-0">
                      Type: {pkg.type}
                    </p>
                  </div>

                  <ul className="ps-1 list-ssss">
                    {benefits.map((benefit, i) => (
                      <li
                        key={i}
                        className="bullet_Wrapper wrapper-bullet align-items-baseline py-2"
                      >
                        <div className="row">
                          <div className="col-lg-2">
                            <img src={blacktick} alt="" className="img-fluid" />
                          </div>
                          <div className="col-lg-10 ps-0">
                            <div className="bullet_point text-white font_reg font_level4">
                              {benefit}
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>

                  {/* Get Started button */}
                  <div className="pack_btn d-flex justify-content-center">
                    {user?.package?.id == pkg.id ? (
                      <button className="btn rounded-pill text-white py-2 px-4 mb-3 bg-success font_reg text-capitalize font_level wrapper-bg-eere">
                        Current Package
                      </button>
                    ) : (
                      <button
                        className="btn rounded-pill text-white py-2 px-4 mb-3 dark-bg font_reg text-capitalize font_level wrapper-bg-eere"
                        onClick={() => {
                          if (typeof closeModal === "function") {
                            closeModal();
                          }
                          navigate("/subscription-women", {
                            state: { selected: pkg },
                          });
                        }}
                      >
                        Get Started
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Modal>
  );
};

export default PackageSelectionModal;
