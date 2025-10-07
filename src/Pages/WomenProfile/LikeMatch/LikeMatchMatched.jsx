import { useEffect, useState } from "react";
import "../../../assets/Css/matchprofile.css";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer";
import { Link } from "react-router-dom";
import ProfileNavbar from "../../../Components/ProfileNavbar";
import Pagination from "../../../Components/Pagination";
import ProfileHeader from "../../../Components/ProfileHeader";
import LikeMatchCard from "../../../Components/LikeMatchCard";
import Spinner from "../../../Components/Spinner";
import { useGetWomanMatchProfilesQuery } from "../../../network/services/WomanAuth";
import { ToastContainer } from "react-toastify";

function LikeMatchMatched() {
  const [filterBy, setFilterBy] = useState("matched");

  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [matchedProfiles, setMatchedProfiles] = useState([]);

  const { data, isLoading, refetch } = useGetWomanMatchProfilesQuery({
    filterBy,
    page: currentPage,
  });

  useEffect(() => {
    if (data?.data) {
      setMatchedProfiles(data?.data.data);
      setCurrentPage(data?.data?.current_page);
      setLastPage(data?.data?.last_page);
    }
  }, [data, currentPage]);

  useEffect(() => {
    refetch();
  }, [currentPage, filterBy]);

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

  return (
    <>
      <Header />

      <ToastContainer />
      <section className="profile_sec">
        <div className="container">
          <div className="row">
            <ProfileHeader />

            <div className="col-md-12 pt-5 for-extra-space mt-5">
              <ProfileNavbar />
            </div>
          </div>
        </div>
      </section>

      <section className="videos_sec">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="d-flex flex-sm-row flex-column align-items-center gap-3 justify-content-end mb-4">
                <Link
                  onClick={() => {
                    setMatchedProfiles([]);
                    setFilterBy("matched");
                  }}
                  className="secondary-medium-font text-white"
                  style={{
                    ...buttonBaseStyle,
                    ...(filterBy === "matched" ? activeStyle : {}),
                  }}
                >
                  Matched Members
                </Link>
                <Link
                  className="secondary-medium-font"
                  onClick={() => {
                    setMatchedProfiles([]);
                    setFilterBy("liked");
                  }}
                  style={{
                    ...buttonBaseStyle,
                    ...(filterBy === "liked" ? activeStyle : {}),
                  }}
                >
                  Unmatched Members
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
                {matchedProfiles.map((card, index) => (
                  <LikeMatchCard
                    key={index}
                    type={filterBy}
                    card={card?.liker}
                    responseAction={() => {
                      refetch();
                    }}
                  />
                ))}
              </div>
              <div className="row mt-5 pt-4">
                <div className="col-lg-2 mx-auto">
                  <div className="btn-wrapper">
                    <Pagination
                      currentPage={currentPage}
                      lastPage={lastPage}
                      onPageChange={(page) => setCurrentPage(page)}
                    />
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
