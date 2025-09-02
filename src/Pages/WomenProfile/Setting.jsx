import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
	edit,
	innerpages1,
	logout,
	massagewrapper,
	notification,
	womenproimg,
	womenproimg1,
} from "../../Constant/Index";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";

// ✅ Redux
import { useDispatch } from "react-redux";
import { setLogoutUser } from "../../network/reducers/AuthReducer";

// ✅ SweetAlert2
import Swal from "sweetalert2";
import ProfileHeader from "../../Components/ProfileHeader";

const Setting = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    document.body.classList.add("body-background");
    return () => {
      document.body.classList.remove("body-background");
    };
  }, []);

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

  // ✅ Logout Handler with SweetAlert
  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(setLogoutUser());
        Swal.fire(
          "Logged Out!",
          "You have been logged out successfully.",
          "success"
        ).then(() => {
          navigate("/");
        });
      }
    });
  };

  return (
    <>
      <Header />

      <section className="profile_sec" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <ProfileHeader />
          </div>
        </div>
      </section>

      {/* Profile settings */}
      <section className="pt-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-11 mx-auto">
              <div className="row address-section mt-5 pt-3 pb-5">
                <div className="col-lg-5">
                  <div className="col-lg-12">
                    <div className="row">
                      <div className="col-lg-12 mb-2">
                        <Link
                          className="btn bg-wra-bg secondary-medium-font text-white input_style"
                          to="/women-change-password"
                        >
                          Change Password
                        </Link>
                      </div>

                      <div className="col-lg-12">
                        <div>
                          <button
                            className="border btn logout-wrapper mt-2 w-100 main_bg text-white secondary-medium-font text-start"
                            onClick={handleLogout}
                            style={{ borderRadius: "10px", padding: "12px" }}
                          >
                            <img
                              src={logout}
                              className="img-fluid me-3"
                              alt=""
                            />
                            Logout
                          </button>
                        </div>
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
};

export default Setting;
