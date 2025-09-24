import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	useStripe,
	useElements,
	CardElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import Alert from "../SweetAlert/Alert";
import { setUserToken } from "../../network/reducers/AuthReducer";
import { useVideoManPurchaseCallMutation } from "../../network/services/ManAuth";

// Stripe public key
const stripePromise = loadStripe(
	"pk_test_51PCJCF1n4j2NN6BKEbuBZqPcxk017JADLY9sKJRmV9BmYdRzKiBpqvkaOJdeP6dmz081n9QNC8BEbKaBMVRjM4E000c6bwOLuD",
);

const CheckoutForm = ({
	checkedTerm,
	showSuccessModal,
	setShowSuccessModal,
}) => {
	const dispatch = useDispatch();
	const { userToken } = useSelector((state) => state.auth);
	const stripe = useStripe();
	const elements = useElements();

	const [cardError, setCardError] = useState("");
	const [payButton, setPayButton] = useState(true);

	const [purchaseCall, response] = useVideoManPurchaseCallMutation();

	// ✅ Success
	useEffect(() => {
		if (response?.isSuccess) {
			setShowSuccessModal(true);

			if (response?.data?.user) {
				dispatch(
					setUserToken({
						user: response.data.user,
						token: userToken,
						remember: true,
					}),
				);
			}

			if (response?.data?.can_call !== undefined) {
				localStorage.setItem("can_call", response.data.can_call);
			}
		}
	}, [
		response?.isSuccess,
		response?.data,
		dispatch,
		userToken,
		setShowSuccessModal,
	]);

	// ❌ Error
	useEffect(() => {
		if (response?.isError) {
			if (response?.error?.data?.statusCode === 409) {
				Alert({
					icon: "error",
					title: "Already Upgraded",
					text:
						response?.error?.data?.message ||
						"You already purchased this package.",
					iconStyle: "error",
				});
				return;
			}

			Alert({
				icon: "error",
				title: "Error",
				text:
					response?.error?.data?.message ||
					"Subscription Failed. Please try again.",
				iconStyle: "error",
			});
		}
	}, [response?.isError, response?.error]);

	// Submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!stripe || !elements) return;

		if (!checkedTerm?.id) {
			Alert({
				iconStyle: "error",
				title: "Error",
				text: "No package selected. Please choose a package before checkout.",
				icon: "error",
			});
			return;
		}

		const cardElement = elements.getElement(CardElement);
		const payload = await stripe.createToken(cardElement);

		if (payload.error) {
			setCardError(payload.error.message);
			cardElement.clear();
			return;
		}

		if (payload?.token?.id) {
			setCardError("");

			const formData = new FormData();
			formData.set("token", payload.token.id);
			formData.set("charges_id", checkedTerm.id);

			purchaseCall(formData);
			cardElement.clear();
		}
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement
				options={{
					style: {
						base: {
							fontSize: "16px",
							color: "#000",
							"::placeholder": { color: "#aab7c4" },
						},
						invalid: { color: "#9e2146" },
					},
				}}
				onChange={(e) => {
					if (e.error) {
						setCardError(e.error.message);
						setPayButton(true);
					} else {
						setCardError("");
						setPayButton(!e.complete);
					}
				}}
			/>
			{cardError && (
				<div style={{ color: "red", marginTop: "10px" }}>{cardError}</div>
			)}
			<button
				type="submit"
				className="btn btn-success w-100 mt-3"
				disabled={!stripe || !elements || payButton}
			>
				{response?.isLoading ? "Processing..." : "Pay Now"}
			</button>
		</form>
	);
};

const Stripwrapper = ({
	checkedTerm,
	showSuccessModal,
	setShowSuccessModal,
}) => (
	<Elements stripe={stripePromise}>
		<CheckoutForm
			checkedTerm={checkedTerm}
			showSuccessModal={showSuccessModal}
			setShowSuccessModal={setShowSuccessModal}
		/>
	</Elements>
);

export default Stripwrapper;
