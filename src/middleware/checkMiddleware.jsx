// ✅ checkMiddleware.js
import { useState } from "react";
import WomenselfieModel from "../Components/WomenselfieModel";
import SelfieModal from "../Components/SelfieModal";
import ManPackagesTab from "../Components/ManPackagesTab";
import PackageSelectionModal from "../Components/PackageSelectionModal";
import PricingModal from "../Components/ChatModals/PricingModal";

export function checkMiddleware(
	Component,
	checkSelfie = false,
	checkPackage = false,
	checkMinutes = false, // 👈 NEW PARAM
) {
	return function ProtectedComponent(props) {
		const [showSelfie, setShowSelfie] = useState(false);
		const [showPackages, setShowPackages] = useState(false);
		const [showPricing, setShowPricing] = useState(false);

		// ✅ LocalStorage values
		const selfieVerified = localStorage.getItem("selfieVerified") === "false";
		const hasPackage = localStorage.getItem("hasPackage") === "true";
		const gender = localStorage.getItem("gender");
		const canCall = localStorage.getItem("can_call") === "true";
		const minutes = Number(localStorage.getItem("minutes") || 0);

		// 🔹 1. Selfie Check
		if (checkSelfie && !selfieVerified) {
			if (gender === "women") {
				return (
					<WomenselfieModel
						isOpen={true}
						onClose={() => {}}
						onVerified={() => {
							localStorage.setItem("selfieVerified", "true");
							setShowSelfie(false);
							window.location.reload();
						}}
					/>
				);
			}
			if (gender === "men") {
				return (
					<SelfieModal
						isOpen={true}
						onClose={() => {}}
						onVerified={() => {
							localStorage.setItem("selfieVerified", "true");
							setShowSelfie(false);
							window.location.reload();
						}}
					/>
				);
			}
			return <Component {...props} />;
		}

		// 🔹 2. Package Check
		if (checkPackage && !hasPackage) {
			if (gender === "women") {
				return (
					<PackageSelectionModal
						isOpen={true}
						onClose={() => setShowPackages(false)}
					/>
				);
			}
			if (gender === "men") {
				return (
					<ManPackagesTab
						isOpen={true}
						onClose={() => setShowPackages(false)}
					/>
				);
			}
			return <Component {...props} />;
		}

		// 🔹 3. Minutes / Call Check
		if (checkMinutes && (!canCall || minutes <= 0)) {
			return (
				<PricingModal
					showPricingModal={true}
					handlePricingClose={() => setShowPricing(false)}
					setShowPricingModal={setShowPricing}
					setShowPayModal={() => {}}
					setSelectedPlan={() => {}}
				/>
			);
		}

		// ✅ All Good → Render Actual Component
		return <Component {...props} />;
	};
}
