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
import {
	usePurchasePackageMutation,
	useUpgradePackageMutation,
} from "../network/services/ManAuth";
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
	const { userToken, user } = useSelector((state) => state.auth);
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const [cardError, setCardError] = useState("");
	const [payButton, setPayButton] = useState(true);

	// ✅ Mutations
	const [purchasePackage, purchaseResponse] = usePurchasePackageMutation();
	const [upgradePackage, upgradeResponse] = useUpgradePackageMutation();

	// ✅ Detect upgrade
	const isUpgrade = !!user?.package;

	// ✅ Pick correct response
	const response = isUpgrade ? upgradeResponse : purchaseResponse;

	// ✅ Handle success
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

			localStorage.setItem("hasPackage", "true");

			setTimeout(() => navigate("/profile"), 1500);
		}
	}, [response?.isSuccess]);

	// ✅ Handle error
	useEffect(() => {
		if (response?.isError) {
			console.error("❌ Purchase/Upgrade Error:", response.error);

			if (response?.error?.data?.statusCode === 409) {
				Alert({
					iconStyle: "error",
					title: "Already Upgraded",
					text:
						response?.error?.data?.message ||
						"You have already upgraded your package.",
					icon: "error",
				});

				setTimeout(() => {
					setShowSuccessModal(false);
					navigate("/profile");
				}, 2000);
				return;
			}

			Alert({
				iconStyle: "error",
				title: "Error",
				text:
					response?.error?.data?.message ||
					"Subscription Failed. Please try again.",
				icon: "error",
			});
		}
	}, [response?.isError, response?.error, navigate, setShowSuccessModal]);

	// ✅ Handle submit
	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!checkedTerm?.id) {
			Alert({
				iconStyle: "error",
				title: "Error",
				text: "No package selected. Please choose a package before checkout.",
				icon: "error",
			});
			return;
		}

		// ✅ Free package (no payment)
		if (checkedTerm.is_paid === 0) {
			const formData = new FormData();
			formData.set("package_id", checkedTerm.id);

			console.log("Sending Free Package FormData:");
			for (let [k, v] of formData.entries()) console.log(k, v);

			isUpgrade ? upgradePackage(formData) : purchasePackage(formData);
			return;
		}

		// ✅ Paid package
		if (!stripe || !elements) {
			Alert({
				iconStyle: "error",
				title: "Error",
				text: "Stripe is not loaded. Please try again.",
				icon: "error",
			});
			return;
		}

		const cardElement = elements.getElement(CardElement);
		if (!cardElement) {
			Alert({
				iconStyle: "error",
				title: "Error",
				text: "Card element not found.",
				icon: "error",
			});
			return;
		}

		const payload = await stripe.createToken(cardElement);

		if (payload.error) {
			setCardError(payload.error.message);
			cardElement.clear();
			console.error("❌ Stripe Token Error:", payload.error);
			return;
		}

		if (!payload?.token?.id) {
			Alert({
				iconStyle: "error",
				title: "Error",
				text: "Stripe token not generated. Please check your card details.",
				icon: "error",
			});
			return;
		}

		// ✅ Send token + package_id
		const formData = new FormData();
		formData.set("stripe_token", payload.token.id);
		formData.set("package_id", checkedTerm.id);

		console.log("Sending Paid Package FormData:");
		for (let [k, v] of formData.entries()) console.log(k, v);

		isUpgrade ? upgradePackage(formData) : purchasePackage(formData);

		cardElement.clear();
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
				className="btn btn-success main-wrapper-btn-wrap border w-100 mt-3"
				disabled={
					checkedTerm?.is_paid === 1 && (!stripe || !elements || payButton)
				}
			>
				{response?.isLoading
					? "Processing..."
					: checkedTerm?.is_paid === 0
					? isUpgrade
						? "Upgrade to Free Plan"
						: "Activate Free Plan"
					: isUpgrade
					? "Upgrade Now"
					: "Pay Now"}
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
