import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  web_new_logo,
  outline1,
  outline2,
  person_img,
  men_profile,
} from "../../Constant/Index";
import RoleSelectionModal from "./RoleSelectionModal";
import LoginModal from "./LoginModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import OtpModal from "./OtpModal";
import NewPasswordModal from "./NewPasswordModal";
import CategoryModal from "./CategoryModal";
import VideoChatModal from "../ChatModals/VideoChatModal";
import Swal from "sweetalert2";
import { handleVideoCallModal } from "../../network/reducers/AuthReducer";

function Header() {
  const [showModal1, setShowModal1] = useState(false); // Role selection
  const [showModal2, setShowModal2] = useState(false); // Login
  const [showModal3, setShowModal3] = useState(false); // Forgot Password
  const [showModal4, setShowModal4] = useState(false); // OTP
  const [showModal5, setShowModal5] = useState(false); // New Password

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [selectedGender, setSelectedGender] = useState("");
  const [userEmail, setUserEmail] = useState(""); // ✅ add this line

  // ✅ Get user from Redux
  const { user, videoCallData } = useSelector((state) => state.auth);
  const [showVideoChatModal, setShowVideoChatModal] = useState(false);
  const [pageLoaded, setPageLoaded] = useState(false);
  const dispatch = useDispatch();
  const member = useRef(null);

  useEffect(() => {
    if (pageLoaded) {
      setShowVideoChatModal(videoCallData?.status);
    } else {
      setPageLoaded(true);
    }
  }, [videoCallData]);

  useEffect(() => {
    // Swal.fire({
    //   title: "Someone is calling you",
    //   html: `
    // <div style="display: flex; flex-direction: column; align-items: center;">
    //   <div class="calling-icon-animation" style="margin-bottom: 10px;">
    // 	<svg width="60" height="60" viewBox="0 0 24 24" fill="none">
    // 	  <circle cx="12" cy="12" r="10" stroke="#3085d6" stroke-width="2" fill="#e3f2fd">
    // 		<animate attributeName="r" values="10;14;10" dur="1s" repeatCount="indefinite"/>
    // 	  </circle>
    // 	  <path d="M17 2C17 2 19 4 19 7C19 10 15 14 12 14C9 14 5 10 5 7C5 4 7 2 7 2" stroke="#3085d6" stroke-width="2" fill="none"/>
    // 	  <circle cx="12" cy="7" r="2" fill="#3085d6"/>
    // 	</svg>
    //   </div>
    //   <span style="font-size: 1.1em;">Incoming Call...</span>
    // </div>
    // `,
    //   showDenyButton: true,
    //   position: "top-end",
    //   animation: true,
    //   showCancelButton: false,
    //   confirmButtonText: "Receive Call",
    //   denyButtonText: `Reject`,
    //   customClass: {
    //     popup: "swal2-calling-popup",
    //   },
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     dispatch(
    //       handleVideoCallModal({
    //         status: true,
    //         // data: { member: member, channel: `channel_${member?.id}_${user?.id}` },
    //         data: { member: member ?? null, channel: `channel_13_20`,type:'IsReceiving' },
    //       })
    //     );
    //   } else if (result.isDenied) {
    //     Swal.fire("Call Rejected", "", "info");
    //   }
    // });
  }, []);

  const handleCategoryShow = (gender) => {
    setSelectedGender(gender); // "male" or "female"
    setShowCategoryModal(true);
  };

  const handleCategoryClose = () => {
    setShowCategoryModal(false);
    setSelectedGender("");
  };

  return (
    <>
      {/* Header Section */}
      <section className="header_sec pt-2">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-2 col-md-2">
              <div className="wrapper">
                <div className="img_wrapper">
                  <Link to="/">
                    <img src={web_new_logo} className="img-fluid" alt="logo" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="nav_wrapper">
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/#about-section">About Us</Link>
                  </li>
                  <li>
                    <Link to="/#realitysec">Testimonials</Link>
                  </li>
                  <li>
                    <Link to="/#contactus">Contact Us</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-4 col-md-5">
              <div className="header_button_wrapper d-flex gap-2">
                {/* Men Button */}
                <button
                  onClick={() => handleCategoryShow("male")}
                  className="btn-bgtransparent under-line"
                >
                  <img src={outline1} alt="Men" className="img-fluid pe-2" />
                  Men
                </button>

                {/* Women Button */}
                <button
                  onClick={() => handleCategoryShow("female")}
                  className="border wrapper-anchor"
                >
                  <img src={outline2} alt="Women" className="img-fluid pe-2" />
                  Women
                </button>

                {/* Profile / Login */}
                {!user ? (
                  <Link
                    className="border only_for_img wrapper-anchor"
                    onClick={() => setShowModal1(true)}
                  >
                    <span>
                      <img src={person_img} alt="Profile" />
                    </span>
                  </Link>
                ) : (
                  <Link
                    className="only_for_img"
                    to={user.gender === "male" ? "/profile" : "/women-profiles"}
                  >
                    <span>
                      <img
                        src={user.profile_image_url || men_profile}
                        alt="Profile"
                        className="wrapper-bug"
                      />
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <RoleSelectionModal
        show={showModal1}
        onClose={() => setShowModal1(false)}
        onLoginClick={() => {
          setShowModal1(false);
          setShowModal2(true);
        }}
      />
      <LoginModal
        show={showModal2}
        onClose={() => setShowModal2(false)}
        onForgotPassword={(gender) => {
          setSelectedGender(gender);
          setShowModal2(false);
          setShowModal3(true);
        }}
      />

      <ForgotPasswordModal
        show={showModal3}
        onClose={() => setShowModal3(false)}
        gender={selectedGender} // "male" ya "female"
        onContinue={(email) => {
          setUserEmail(email);
          setShowModal3(false);
          setShowModal4(true); // OTP modal
        }}
      />

      <OtpModal
        show={showModal4}
        onClose={() => setShowModal4(false)}
        onContinue={() => {
          setShowModal4(false);
          setShowModal5(true); // ✅ open reset password modal only if OTP is valid
        }}
        gender={selectedGender} // ✅ use selectedGender from state
        email={userEmail} // ✅ use userEmail saved from ForgotPasswordModal
      />

      <NewPasswordModal
        show={showModal5}
        onClose={() => setShowModal5(false)}
        role={selectedGender} // 👈 gender bhejna zaroori hai
        email={userEmail} // 👈 email bhi bhejna zaroori hai
      />

      {/* Category Modal */}
      <CategoryModal
        showcategoryModal={showCategoryModal}
        handlecategoryClose={handleCategoryClose}
        defaultGender={selectedGender}
      />

      <VideoChatModal
        showVideoChatModal={showVideoChatModal}
        handleVideoChatClose={() => setShowVideoChatModal(false)}
      />
    </>
  );
}

export default Header;
