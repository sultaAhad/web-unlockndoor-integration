import { useState } from "react";
import SelfieModal from "../Components/SelfieModal";
import ManPackagesTab from "../Components/ManPackagesTab";
import PackageSelectionModal from "../Components/PackageSelectionModal";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";

export function checkMiddleware(
	Component,
	checkSelfie = false,
	checkPackage = false,
) {
	return function ProtectedComponent(props) {
		const [showSelfie, setShowSelfie] = useState(false);
		const [showPackages, setShowPackages] = useState(false);

		const over18 = localStorage.getItem("over18") === "true";
		if (!over18) {
			return <Navigate to={"/access-not-allowed"}></Navigate>;
		}

		const hasPackage = localStorage.getItem("hasPackage") === "true";

		// const selfieVerified = localStorage.getItem("selfieVerified") === "true";
		const selfieVerified = true;
		const gender = localStorage.getItem("gender");

		if (checkPackage && !hasPackage) {
			if (gender === "women") {
				return (
					<PackageSelectionModal
						isOpen={true}
						closeModal={() => setShowPackages(false)}
						onRequestClose={() => setShowPackages(false)}
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
		}

		if (checkSelfie && !selfieVerified) {
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
	};
}
