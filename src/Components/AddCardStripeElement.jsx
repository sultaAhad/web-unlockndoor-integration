// import { loadStripe } from "@stripe/stripe-js";
// import {
//   Elements,
//   useStripe,
//   useElements,
//   CardElement,
// } from "@stripe/react-stripe-js";

// const AddCardStripeElement = () => {
//   const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);
//   const stripe = useStripe();
//   const elements = useElements();

//   const [cardError, setCardError] = useState("");
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!stripe || !elements) return;

//     if (!checkedTerm?.id) {
//       Alert({
//         iconStyle: "error",
//         title: "Error",
//         text: "No package selected. Please choose a package before checkout.",
//         icon: "error",
//       });
//       return;
//     }

//     const cardElement = elements.getElement(CardElement);
//     const payload = await stripe.createToken(cardElement);

//     if (payload.error) {
//       setCardError(payload.error.message);
//       cardElement.clear();
//       return;
//     }

//     if (payload?.token?.id) {
//       setCardError("");

//       const formData = new FormData();
//       formData.set("token", payload.token.id);
//       formData.set("charges_id", checkedTerm.id);
//       formData.set("women_id", memberId); // ✅ send women_id

//       // purchaseCall(formData);
//       cardElement.clear();
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Elements stripe={stripePromise}>
        // <CardElement
        //   options={{
        //     style: {
        //       base: {
        //         fontSize: "16px",
        //         color: "#000",
        //         "::placeholder": { color: "#aab7c4" },
        //       },
        //       invalid: { color: "#9e2146" },
        //     },
        //   }}
        //   onChange={(e) => {
        //     if (e.error) {
        //       setCardError(e.error.message);
        //     } else {
        //       setCardError("");
        //     }
        //   }}
        // />
//       </Elements>
//       {cardError && (
//         <div style={{ color: "red", marginTop: "10px" }}>{cardError}</div>
//       )}
//       <button
//         type="submit"
//         className="btn btn-success main-wrapper-btn-wrap border w-100 mt-3"
//         disabled={!stripe || !elements}
//       >
//         {response?.isLoading ? "Processing..." : "Pay Now"}
//       </button>
//     </form>
//   );
// };
// export default AddCardStripeElement;




// StripeWrapper.jsx or in your main App.jsx
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

function StripeWrapper({ children }) {
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  );
}

export default StripeWrapper;