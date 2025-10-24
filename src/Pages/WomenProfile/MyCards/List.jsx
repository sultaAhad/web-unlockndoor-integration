import Spinner from "../../../Components/Spinner";
import Header from "../../../Components/Header/Header";
import Footer from "../../../Components/Footer";
import ProfileHeader from "../../../Components/ProfileHeader";
import { useEffect, useState } from "react";
import {
  useAddPaymentMethodMutation,
  useDeletePaymentMethodsMutation,
  useGetPaymentMethodsQuery,
  useMakePaymentMethodDefaultMutation,
} from "../../../network/services/WomanAuth";
import { Modal } from "react-bootstrap";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  useStripe,
  useElements,
  CardElement,
} from "@stripe/react-stripe-js";
import { toast, ToastContainer } from "react-toastify";

const AddCardModal = ({ show, onHide }) => {
  const [addPaymentMethod, { isLoading: isAdding }] =
    useAddPaymentMethodMutation();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      setCardError("Stripe is not ready yet");
      return;
    }

    const cardElement = elements.getElement(CardElement);
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      setCardError(error.message);
      return;
    }

    const formData = new FormData();
    formData.set("payment_method_id", paymentMethod.id);
    await addPaymentMethod(formData);
    setCardError("");
    cardElement.clear();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} centered backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title className="m-0">Add Card</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <div className="mb-3 card-input-wrapper">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: "16px",
                    color: "#000",
                    backgroundColor: "transparent",
                    "::placeholder": { color: "#aab7c4" },
                  },
                  invalid: { color: "#9e2146" },
                },
              }}
              onChange={(e) => {
                if (e.error) {
                  setCardError(e.error.message);
                } else {
                  setCardError("");
                }
              }}
            />
          </div>

          {cardError && <p className="text-danger mt-2">{cardError}</p>}
          <button
            className="border text-white btn mt-2 w-100 main_bg white_color text-capitalize pt-2 pb-2"
            type="submit"
          >
            {isAdding ? "Processing..." : "Add Card"}
          </button>
        </form>
      </Modal.Body>
    </Modal>
  );
};

const MyCards = () => {
  const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
  // const stripe = useStripe();
  // const elements = useElements();

  const [cardError, setCardError] = useState("");
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [defaultCardId, setDefaultCardId] = useState(null);
  const [savedCards, setSavedCards] = useState([
    {
      id: 1,
      brand: "visa",
      last4: "4242",
      exp_month: "12",
      exp_year: "2025",
      isDefault: true,
    },
    {
      id: 2,
      brand: "mastercard",
      last4: "8888",
      exp_month: "08",
      exp_year: "2026",
      isDefault: false,
    },
  ]);

  const { data, isLoading, refetch } = useGetPaymentMethodsQuery();
  const [makePaymentMethodDefault, { isLoading: isDefaultLoading }] =
    useMakePaymentMethodDefaultMutation();
  const [deletePaymentMethods, { isLoading: isDeleteLoading }] =
    useDeletePaymentMethodsMutation();

  useEffect(() => {
    if (data?.data && data?.data?.cards.length > 0) {
      setSavedCards(data.data.cards);
      setDefaultCardId(data.data.default_payment_method);
    }
  }, [data]);

  const handleDefaultCard = (id) => {
    const formData = new FormData();
    formData.set("payment_method_id", id);
    makePaymentMethodDefault(formData).then(() => {
      toast.success("Default card updated successfully");
      refetch();
    });
  };

  const handleRemoveCard = (id) => {
    deletePaymentMethods(id).then(() => {
      toast.success("Card removed successfully");
      refetch();
    });
  };

  return (
    <Elements stripe={stripePromise}>
      <>
        <Header />
        <ToastContainer />
        <section className="profile_sec">
          <div className="container">
            <div className="row">
              <ProfileHeader />
            </div>
          </div>
        </section>

        <section className="cards_sec py-5">
          <div className="container">
            {isLoading ? (
              <div className="row justify-content-center py-5">
                <div className="col-12 text-center">
                  <Spinner />
                  <p className="mt-3 text-muted">Loading your cards...</p>
                </div>
              </div>
            ) : (
              <div className="row">
                <div className="col-12">
                  {/* Header Section */}
                  <div className="float-end mb-4 w-25">
                    <button
                      onClick={() => setShowAddCardModal(true)}
                      className="border text-white btn mt-2 w-100 main_bg white_color text-capitalize pt-2 pb-2"
                    >
                      <i className="fas fa-plus me-2"></i>
                      Add New Card
                    </button>
                  </div>
                </div>
                <div className="col-12">
                  {/* Cards Grid */}
                  <div className="row g-4">
                    {savedCards.length === 0 ? (
                      <div className="col-12">
                        <div className="text-center py-5">
                          <div className="mb-4">
                            <i className="fas fa-credit-card fa-3x text-muted mb-3"></i>
                          </div>
                          <h5 className="text-muted mb-3">No saved cards</h5>
                          <p className="text-muted mb-4">
                            You haven't added any payment cards yet.
                          </p>
                          <button className="border text-white btn mt-2 w-100 main_bg white_color text-capitalize pt-2 pb-2">
                            Add Your First Card
                          </button>
                        </div>
                      </div>
                    ) : (
                      savedCards.map((card) => (
                        <div key={card.id} className="col-lg-6 col-xl-4">
                          <div
                            className={`card  shadow-sm h-100 hover-shadow transition-all ${
                              card.id == defaultCardId ? "border-white" : ""
                            }`}
                            style={{
                              background:
                                "linear-gradient(135deg, rgb(80 23 75) 0%, rgb(86 24 74) 100%)",
                              color: "white",
                            }}
                          >
                            <div className="card-body d-flex flex-column">
                              <div className="d-flex justify-content-between align-items-start mb-3">
                                <div className="d-flex align-items-center">
                                  <span className="text-uppercase fw-bold">
                                    {card.brand}
                                  </span>
                                </div>
                                {card.id == defaultCardId ? (
                                  <span className="badge bg-light position-absolute px-3 py-2 right-0 text-dark top-0 m-1">
                                    Default
                                  </span>
                                ) : (
                                  <>
                                    <span className="position-absolute right-0 top-0 m-1">
                                      <button
                                        onClick={() =>
                                          handleDefaultCard(card.id)
                                        }
                                        className="btn btn-outline-light btn-sm"
                                        title="Set as default card"
                                      >
                                        {isDefaultLoading
                                          ? "Processing..."
                                          : "Set as Default"}
                                      </button>
                                      <button
                                        onClick={() =>
                                          handleRemoveCard(card.id)
                                        }
                                        className="btn btn-light btn-sm ms-2"
                                        title="Remove card"
                                      >
                                        {isDeleteLoading ? (
                                          "Processing..."
                                        ) : (
                                          <i className="fas fa-trash text-danger"></i>
                                        )}
                                      </button>
                                    </span>
                                  </>
                                )}
                              </div>

                              <div className="d-flex justify-content-between mt-3">
                                <div className="">
                                  <div className="d-flex align-items-center">
                                    <span className="fs-5 fw-bold me-2">
                                      ••••
                                    </span>
                                    <span className="fs-5 fw-bold">
                                      {card?.card?.last4 ?? 0}
                                    </span>
                                  </div>
                                  <small className="opacity-75">
                                    Card Number
                                  </small>
                                </div>

                                <div className="d-flex justify-content-end w-50">
                                  <div>
                                    <div className="fw-bold">
                                      {card?.card?.exp_month}/
                                      {card?.card?.exp_year}
                                    </div>
                                    <small className="opacity-75">
                                      Expires
                                    </small>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>

          <AddCardModal
            show={showAddCardModal}
            onHide={() => {
              setShowAddCardModal(false);
              refetch();
            }}
          />
        </section>

        <Footer />

        <style jsx>{`
          .hover-shadow {
            transition: all 0.3s ease;
          }
          .hover-shadow:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15) !important;
          }
          .transition-all {
            transition: all 0.3s ease;
          }
        `}</style>
      </>
    </Elements>
  );
};

export default MyCards;
