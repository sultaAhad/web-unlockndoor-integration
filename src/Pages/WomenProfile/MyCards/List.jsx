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
import PaymentMethodCard from "../../../Components/PaymentMethodCard";

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
    toast.success("Card has been added successfully.");
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
  const [showAddCardModal, setShowAddCardModal] = useState(false);
  const [defaultCardId, setDefaultCardId] = useState(null);
  const [savedCards, setSavedCards] = useState([]);

  const { data, isLoading, refetch } = useGetPaymentMethodsQuery();

  useEffect(() => {
    if (data?.data && data?.data?.cards.length > 0) {
      setSavedCards(data.data.cards);
      setDefaultCardId(data.data.default_payment_method);
    }
  }, [data]);

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
                  <div className="row g-4">
                    {savedCards.length === 0 ? (
                      <div className="col-12 text-center py-5 text-muted">
                        <i className="fas fa-credit-card fa-3x mb-3"></i>
                        <h5>No saved cards</h5>
                        <p>You haven't added any payment cards yet.</p>
                      </div>
                    ) : (
                      savedCards.map((card) => (
                        <PaymentMethodCard
                          card={card}
                          defaultCardId={defaultCardId}
                          onAction={() => {
                            refetch();
                          }}
                        />
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

          .animated-circle {
            position: absolute;
            top: 32px;
            right: 160px;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            animation: vibrate 0.3s infinite linear;
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
            backdrop-filter: blur(2px);
          }
          .brand-logo {
            width: 50px;
            height: auto;
            object-fit: contain;
            filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.5));
          }

          @keyframes vibrate {
            0% {
              transform: translate(0);
            }
            25% {
              transform: translate(1px, -1px);
            }
            50% {
              transform: translate(-1px, 1px);
            }
            75% {
              transform: translate(1px, 1px);
            }
            100% {
              transform: translate(0);
            }
          }
        `}</style>
      </>
    </Elements>
  );
};

export default MyCards;
