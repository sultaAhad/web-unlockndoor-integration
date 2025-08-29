// PlaceOrderstripe.jsx

import React, { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
	Elements,
	useStripe,
	useElements,
	CardElement,
} from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from "react-redux";
import Alert from "./SweetAlert/Alert";
import { setUserToken } from "../network/reducers/AuthReducer";
import { usePurchasePackageMutation } from "../network/services/ManAuth";
import { useNavigate } from "react-router-dom";

// ✅ Stripe key
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
	const navigate = useNavigate(); // ✅ add navigate

	const [cardError, setCardError] = useState("");
	const [payButton, setPayButton] = useState(true);

	const [purchasePackage, response] = usePurchasePackageMutation();

	// ✅ Handle success
	useEffect(() => {
		if (response?.isSuccess) {
			setShowSuccessModal(true);
			console.log("✅ Purchase Success Response:", response.data);

			// update redux user
			if (response?.data?.user) {
				dispatch(
					setUserToken({
						user: response.data.user,
						token: userToken,
						remember: true,
					}),
				);
			}

			// ✅ navigate after short delay
			setTimeout(() => {
				navigate("/profile");
			}, 1500);
		}
	}, [response?.isSuccess]);

	// ✅ Handle error
	useEffect(() => {
		if (response?.isError) {
			console.error("❌ Purchase Error:", response.error);
			Alert({
				iconStyle: "error",
				title: "Error",
				text:
					response?.error?.data?.message ||
					"Subscription Failed. Please try again.",
				icon: "error",
			});
		}
	}, [response?.isError]);

	// ✅ Submit handler
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
			console.error("❌ Stripe Token Error:", payload.error);
			return;
		}

		if (payload?.token?.id) {
			setCardError("");

			const formData = new FormData();
			formData.set("stripe_token", payload.token.id);
			formData.set("package_id", checkedTerm.id);

			console.log("📦 Sending Purchase Request =>", {
				stripe_token: payload.token.id,
				package_id: checkedTerm.id,
			});

			purchasePackage(formData);
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
							color: "#fff",
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

const PlaceOrderstripe = ({
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

export default PlaceOrderstripe;
