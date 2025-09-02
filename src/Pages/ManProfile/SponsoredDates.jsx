import React, { useEffect, useState } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import {
	chatimg1,
	edit,
	innerpages1,
	manproimage2,
	manproimage3,
	massagewrapper,
	message,
	notification,
	notify_img,
} from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import Pagination from "../../Components/Pagination";
import { Button } from "react-bootstrap";
import ReofferModal from "./ReofferModal";
import ProfileHeader from "../../Components/ProfileHeader";
function SponsoredDates() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true }); // Initialize AOS with options
  }, []);
  // Sample data for orders

  const sponsoredData = [
    {
      name: "Jan Tschichold",
      date: "23/04/2025",
      offer: "$700",
      status: "Accepted",
      img: chatimg1,
      btnLabel: "Message",
      btnClass: "extra-bg-1 asdasasd",
      statusClass: "extra-color-4",
      para: "Lorem Ipsum sit amet",
      btnLink: "/chat", // added link
    },
    {
      name: "Jan Tschichold",
      date: "23/04/2025",
      offer: "$700",
      status: "Pending",
      img: notify_img,
      btnLabel: "Withdraw",
      btnClass: "extra-bg-2",
      statusClass: "extra-color-1",
      para: "Lorem Ipsum sit amet",
    },
    {
      name: "Jan Tschichold",
      date: "23/04/2025",
      offer: "$700",
      status: "Rejected",
      img: notify_img,
      btnLabel: "Reoffer",
      btnClass: "extra-bg-4",
      statusClass: "extra-color-3",
      para: "Lorem Ipsum sit amet",
    },
    {
      name: "Jan Tschichold",
      date: "23/04/2025",
      offer: "$700",
      status: "Countered",
      img: chatimg1,
      btnLabel: "Message",
      btnClass: "extra-bg-1",
      statusClass: "extra-color-4",
      para: "Lorem Ipsum sit amet",
      btnLink: "/chat", // added link
    },
    {
      name: "Jan Tschichold",
      date: "23/04/2025",
      offer: "$700",
      status: "Accepted",
      img: chatimg1,
      btnLabel: "Message",
      btnClass: "extra-bg-1",
      statusClass: "extra-color-4",
      para: "Lorem Ipsum sit amet",
      btnLink: "/chat", // added link
    },
  ];

  // Reoffer Modal States
  const [showreofferModal, setShowreofferModal] = useState(false);
  const handlereofferClose = () => setShowreofferModal(false);
  const handlereofferShow = () => setShowreofferModal(true);
  // Reoffer Modal States
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

      <section className="profile_sec " data-aos="fade-up">
        <div className="container">
          <div className="row">
            <ProfileHeader />

            <div className="col-md-12 pt-5 for-extra-space">
              <ProfileNavbartwo />
            </div>
          </div>
        </div>
      </section>
      <section className="cart-section order-wrapper pt-5 mb-5 pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 ">
              <div className="row">
                <div className="col-lg-12 ps-lg-0 pe-lg-0">
                  <div className="cart-table-wrapper">
                    <div className="table-responsive">
                      <table className="table">
                        <thead className="bg-transparent">
                          <tr>
                            <th className="position-relative text-start">
                              <h4 className="secondary-medium-font text-white level-8 mb-0">
                                Name
                              </h4>
                            </th>
                            <th className="position-relative">
                              <h4 className="secondary-medium-font text-white level-8 mb-0">
                                Date
                              </h4>
                            </th>
                            <th className="position-relative">
                              <h4 className="secondary-medium-font text-white level-8 mb-0">
                                Offer
                              </h4>
                            </th>
                            <th className="position-relative">
                              <h4 className="secondary-medium-font text-white level-8 mb-0">
                                Action
                              </h4>
                            </th>
                            <th className="position-relative">
                              <h4 className="secondary-medium-font text-white level-7"></h4>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {sponsoredData.map((item, index) => (
                            <tr className="wrapper-table-d" key={index}>
                              <td className="secondary-medium-font  level-8 ">
                                <div className="d-flex align-items-center gap-3">
                                  <div className="">
                                    {" "}
                                    <img
                                      src={chatimg1}
                                      className="img-fluid wrapper-fluid-notification"
                                      alt=""
                                    />
                                  </div>
                                  <div className="">
                                    <h4 class="secondary-medium-font mb-1 text-white text-start level-8 ">
                                      {item.name}
                                    </h4>
                                    <p className="mb-0 text-white ">
                                      {item.para}
                                    </p>
                                  </div>
                                </div>
                              </td>
                              <td className="secondary-medium-font text-white level-8 text-center">
                                {item.date}
                              </td>
                              <td className="secondary-medium-font text-white level-8 text-center">
                                {item.offer}
                              </td>
                              <td className="secondary-medium-font text-white level-8 text-center">
                                <h4
                                  className={`${item.statusClass} mb-0 secondary-medium-font level-8`}
                                >
                                  {item.status}
                                </h4>
                              </td>
                              <td className="secondary-medium-font level-8 text-center">
                                <div className="btn-wrapper">
                                  {item.btnLabel === "Message" &&
                                  item.btnLink ? (
                                    <Link
                                      to={item.btnLink}
                                      className={`wrapper-ggg btn-write rounded-0 border-none d-flex align-items-center justify-content-center w-100 ${item.btnClass}`}
                                    >
                                      {item.btnLabel}
                                    </Link>
                                  ) : (
                                    <button
                                      className={`wrapper-ggg btn-write rounded-0 border-none d-flex align-items-center justify-content-center w-100 ${item.btnClass}`}
                                      onClick={() => {
                                        if (item.btnLabel === "Reoffer") {
                                          handlereofferShow();
                                        }
                                        // Add logic for Withdraw or other actions if needed
                                      }}
                                    >
                                      {item.btnLabel}
                                    </button>
                                  )}
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="container mt-5">
                          <Pagination />
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

      {/* Reoffer Modal  */}
      <ReofferModal
        showreofferModal={showreofferModal}
        handlereofferClose={handlereofferClose}
        setShowreofferModal={setShowreofferModal}
      />
      {/* Reoffer Modal  */}
    </>
  );
}

export default SponsoredDates;
