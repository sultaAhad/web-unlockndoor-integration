import React, { useEffect, useState } from "react";
import "../../../assets/Css/matchprofile.css";

import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer";
import {
  edit,
  innerpages1,
  like,
  like1,
  like2,
  like3,
  like4,
  massagewrapper,
  message,
  notification,
  womenproimg,
  womenproimg1,
} from "../../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ProfileNavbar from "../../../Components/ProfileNavbar";
import Pagination from "../../../Components/Pagination";
import LikeMatchNavigation from "../../../Components/LikeMatchNavigation";
import ProfileHeader from "../../../Components/ProfileHeader";
import LikeMatchCard from "../../../Components/LikeMatchCard";
import Spinner from "../../../Components/Spinner";

function LikeMatchMatched() {
  const [filterBy, setFilterBy] = useState("matched");
  const [isLoading, setIsLoading] = useState(false);

  const activeStyle = {
    backgroundColor: "#c22751",
    color: "#fff",
    border: "1px solid #c22751",
  };

  const buttonBaseStyle = {
    padding: "10px 24px",
    borderRadius: "999px",
    fontWeight: "500",
    fontSize: "14px",
    border: "1px solid #c22751",
    backgroundColor: "transparent",
    color: "#c22751",
    cursor: "pointer",
    textDecoration: "none",
    transition: "all 0.3s ease",
  };

  const cards = [
    {
      image: like,
    },
    {
      image: like1,
    },
    {
      image: like2,
    },
    {
      image: like3,
    },
    {
      image: like4,
    },
    {
      image: like3,
    },
  ];

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);
  // useEffect(() => {
  //   document.body.style.backgroundImage = `url(${innerpages1})`;
  //   document.body.style.backgroundSize = "cover";
  //   document.body.style.backgroundPosition = "center";
  //   document.body.style.minHeight = "100vh";

  //   return () => {
  //     document.body.style.backgroundImage = "";
  //   };
  // }, []);

  return (
    <>
      <Header />

      <section className="profile_sec" data-aos="fade-up">
        <div className="container">
          <div className="row">
            <ProfileHeader />

            <div className="col-md-12 pt-5 for-extra-space mt-5">
              <ProfileNavbar />
            </div>
          </div>
        </div>
      </section>

      <section className="videos_sec" data-aos="fade-right">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex align-items-center gap-3 justify-content-end mb-4">
                <Link
                  className="secondary-medium-font"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setFilterBy("unmatched");
                      setIsLoading(false);
                    }, 1000);
                  }}
                  style={{
                    ...buttonBaseStyle,
                    ...(filterBy === "unmatched" ? activeStyle : {}),
                  }}
                >
                  Unmatched Members
                </Link>
                <Link
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setFilterBy("matched");
                      setIsLoading(false);
                    }, 1000);
                  }}
                  className="secondary-medium-font text-white"
                  style={{
                    ...buttonBaseStyle,
                    ...(filterBy === "matched" ? activeStyle : {}),
                  }}
                >
                  Matched Members
                </Link>
              </div>
            </div>
          </div>
          {isLoading ? (
            <div className="row justify-content-center">
              <Spinner />
            </div>
          ) : (
            <>
              <div className="row">
                {cards.map((card, index) => (
                  <LikeMatchCard key={index} type={filterBy} card={card} />
                ))}
              </div>
              <div className="row mt-5 pt-4">
                <div className="col-lg-2 mx-auto">
                  <div className="btn-wrapper">
                    <Pagination />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default LikeMatchMatched;
