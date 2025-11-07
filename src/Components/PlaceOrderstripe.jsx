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
	useGetManDataQuery,
	usePurchasePackageMutation,
	useUpgradePackageMutation,
} from "../network/services/ManAuth";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_APP_STRIPE_KEY);

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
	const { refetch } = useGetManDataQuery(undefined, { skip: true });

	const [cardError, setCardError] = useState("");
	const [payButton, setPayButton] = useState(true);

	// ✅ Mutations
	const [purchasePackage, purchaseResponse] = usePurchasePackageMutation();
	const [upgradePackage, upgradeResponse] = useUpgradePackageMutation();

	const isUpgrade = !!user?.package;
	const response = isUpgrade ? upgradeResponse : purchaseResponse;

	// ✅ Success handling
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

			// ✅ Navigate and force full refresh for updated profile data
			setTimeout(() => {
				navigate("/profile");
				window.location.reload(); // 🔥 Force full page reload
			}, 1500);
		}
	}, [response?.isSuccess]);

	// ✅ Error handling
	useEffect(() => {
		if (response?.isError) {
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
					window.location.reload(); // ✅ also refresh if already upgraded
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
	}, [response?.isError]);

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

		// ✅ FREE PACKAGE → Direct API call (no Stripe)
		if (checkedTerm.is_paid === 0 || Number(checkedTerm.price) === 0) {
			const formData = new FormData();
			formData.set("package_id", checkedTerm.id);

			isUpgrade ? upgradePackage(formData) : purchasePackage(formData);
			return;
		}

		// ✅ PAID PACKAGE FLOW
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
		const payload = await stripe.createToken(cardElement);

		if (payload.error) {
			setCardError(payload.error.message);
			cardElement.clear();
			return;
		}

		const formData = new FormData();
		formData.set("stripe_token", payload.token.id);
		formData.set("package_id", checkedTerm.id);

		isUpgrade ? upgradePackage(formData) : purchasePackage(formData);
		cardElement.clear();
	};

	return (
		<form onSubmit={handleSubmit}>
			{/* ✅ Show card input only for paid plans */}
			{checkedTerm.is_paid === 1 && (
				<>
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
				</>
			)}

			{/* ✅ Button label changes based on package type */}
			<button
				type="submit"
				className="btn btn-success main-wrapper-btn-wrap border w-100 mt-3"
				disabled={
					checkedTerm?.is_paid === 1 && (!stripe || !elements || payButton)
				}
			>
				{response?.isLoading
					? "Processing..."
					: checkedTerm?.is_paid === 0 || Number(checkedTerm.price) === 0
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
