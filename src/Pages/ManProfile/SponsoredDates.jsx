import { useEffect, useState } from "react";
import "../../assets/Css/profile.css";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import { innerpages1 } from "../../Constant/Index";
import AOS from "aos";
import { Link } from "react-router-dom";
import ProfileNavbartwo from "../../Components/ProfileNavbartwo";
import Pagination from "../../Components/Pagination";
import ReofferModal from "./ReofferModal";
import ProfileHeader from "../../Components/ProfileHeader";
import { useGetSponsoredDatesQuery } from "../../network/services/ManAuth";
import Spinner from "../../Components/Spinner";
function SponsoredDates() {
  const { data, isLoading } = useGetSponsoredDatesQuery();
  const [sponsoredDates, setSponsoredDates] = useState([]);

  useEffect(() => {
    setSponsoredDates(data?.response?.data?.sponsoredDates ?? []);
  }, [data]);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const [showreofferModal, setShowreofferModal] = useState(false);
  const handlereofferClose = () => setShowreofferModal(false);
  const handlereofferShow = () => setShowreofferModal(true);

  useEffect(() => {
    document.body.style.backgroundImage = `url(${innerpages1})`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.minHeight = "100vh";
    return () => {
      document.body.style.backgroundImage = "";
    };
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "accepted":
        return "extra-color-4";
      case "pending":
        return "extra-color-1";
      case "rejected":
        return "extra-color-3";
      case "countered":
        return "extra-color-4";
      default:
        return "";
    }
  };

  const Actions = (status) => {
    if (status === "pending") {
      return (
        <button
          className={`wrapper-ggg btn-write rounded-0 border-none d-flex align-items-center justify-content-center w-100 extra-bg-2`}
          onClick={() => {}}
        >
          Withdraw
        </button>
      );
    }
    if (status === "Rejected") {
      return (
        <button
          className={`wrapper-ggg btn-write rounded-0 border-none d-flex align-items-center justify-content-center w-100 extra-bg-4`}
          onClick={() => {
            handlereofferShow();
          }}
        >
          ReOffer
        </button>
      );
    }
    if (status === "Accepted" || status === "Countered") {
      return (
        <Link
          to={"/chat"}
          className={`wrapper-ggg btn-write rounded-0 border-none d-flex align-items-center justify-content-center w-100 extra-bg-1`}
        >
          Message
        </Link>
      );
    }
  };

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
          {isLoading ? (
            <div className="row justify-content-center">
              <Spinner />
            </div>
          ) : (
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
                            {sponsoredDates.map((sponsorDate, index) => (
                              <tr className="wrapper-table-d" key={index}>
                                <td className="secondary-medium-font  level-8 ">
                                  <div className="d-flex align-items-center gap-3">
                                    <div className="">
                                      {" "}
                                      <img
                                        src={
                                          sponsorDate.women?.profile_image_url
                                        }
                                        className="img-fluid wrapper-fluid-notification"
                                        alt=""
                                      />
                                    </div>
                                    <div className="">
                                      <h4 className="secondary-medium-font mb-1 text-white text-start level-8 ">
                                        {sponsorDate.women?.name}
                                      </h4>
                                      <p className="mb-0 text-white ">
                                        {sponsorDate.comment}
                                      </p>
                                    </div>
                                  </div>
                                </td>
                                <td className="secondary-medium-font text-white level-8 text-center">
                                  {sponsorDate.date}
                                </td>
                                <td className="secondary-medium-font text-white level-8 text-center">
                                  ${sponsorDate.offer_price}
                                </td>
                                <td className="secondary-medium-font text-white level-8 text-center">
                                  <h4
                                    className={`${getStatusClass(
                                      sponsorDate.status
                                    )} mb-0 secondary-medium-font level-8 text-capitalize`}
                                  >
                                    {sponsorDate.status}
                                  </h4>
                                </td>
                                <td className="secondary-medium-font level-8 text-center">
                                  <div className="btn-wrapper">
                                    {Actions(sponsorDate.status)}
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
          )}
        </div>
      </section>
      <Footer />

      <ReofferModal
        showreofferModal={showreofferModal}
        handlereofferClose={handlereofferClose}
        setShowreofferModal={setShowreofferModal}
      />
    </>
  );
}

export default SponsoredDates;
