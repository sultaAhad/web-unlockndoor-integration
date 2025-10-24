import Spinner from "../../../Components/Spinner";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer";
import ProfileHeader from "../../../Components/ProfileHeader";
import { useEffect, useState } from "react";
import { useGetWomanMatchProfilesQuery } from "../../../network/services/WomanAuth";

const MyCards = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [savedCards, setSavedCards] = useState([
    {
      id: 0,
      brand: "visa",
      last4: "4242",
      exp_month: "12",
      exp_year: "2025",
      isDefault: true,
    },
    {
      id: 0,
      brand: "visa",
      last4: "4242",
      exp_month: "12",
      exp_year: "2025",
      isDefault: true,
    },
  ]);

  const { data, isLoading, refetch } = useGetWomanMatchProfilesQuery({
    page: currentPage,
  });

  const handleDefaultCard = (id) => {
    setSavedCards((prevCards) =>
      prevCards.map((card) =>
        card.id === id
          ? { ...card, isDefault: true }
          : { ...card, isDefault: false }
      )
    );
  };

  return (
    <>
      <Header />
      <section className="profile_sec">
        <div className="container">
          <div className="row">
            <ProfileHeader />
          </div>
        </div>
      </section>

      <section className="videos_sec">
        <div className="container">
          {isLoading ? (
            <div className="row justify-content-center">
              <Spinner />
            </div>
          ) : (
            <div className="row">
              <div className="col-12">
                <h4 className="mb-4">Saved Cards</h4>
                <div className="row g-3">
                  {savedCards?.map((card) => (
                    <div
                      key={card.id}
                      className="card mb-3 p-3 border rounded shadow-sm hover-effect col-md-6"
                    >
                      <div className="d-flex align-items-center">
                        <input
                          type="radio"
                          name="defaultCard"
                          id={card.id}
                          checked={card.isDefault}
                          onChange={() => handleDefaultCard(card.id)}
                          className="me-3"
                        />
                        <div className="card-details">
                          <div className="d-flex align-items-center">
                            <img
                              src={`/card-icons/${card.brand}.png`}
                              alt={card.brand}
                              className="me-2"
                              style={{ width: "40px" }}
                            />
                            <span>•••• {card.last4}</span>
                          </div>
                          <small className="text-muted">
                            Expires {card.exp_month}/{card.exp_year}
                          </small>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default MyCards;
