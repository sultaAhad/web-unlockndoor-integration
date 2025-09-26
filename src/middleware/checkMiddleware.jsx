import { useState } from "react";
import WomenselfieModel from "../Components/WomenselfieModel";
import SelfieModal from "../Components/SelfieModal";
import ManPackagesTab from "../Components/ManPackagesTab";
import PackageSelectionModal from "../Components/PackageSelectionModal";

export function checkMiddleware(
	Component,
	checkSelfie = false,
	checkPackage = false,
) {
	return function ProtectedComponent(props) {
		const [showSelfie, setShowSelfie] = useState(false);
		const [showPackages, setShowPackages] = useState(false);

		// ✅ Fix: selfieVerified is true only if value is "true"
		const selfieVerified = localStorage.getItem("selfieVerified") === "true";
		const hasPackage = localStorage.getItem("hasPackage") === "true";
		const gender = localStorage.getItem("gender");

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

		return <Component {...props} />;
	};
}
