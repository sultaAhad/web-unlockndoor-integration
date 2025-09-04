import { useState } from "react";
import WomenselfieModel from "../Components/WomenselfieModel";
import SelfieModal from "../Components/SelfieModal";
import ManPackagesTab from "../Components/ManPackagesTab";
import PackageSelectionModal from "../Components/PackageSelectionModal";
import { Navigate } from "react-router-dom";

export function checkMiddleware(
	Component,
	checkSelfie = false,
	checkPackage = false,
) {
	return function ProtectedComponent(props) {
		const [showSelfie, setShowSelfie] = useState(false);
		const [showPackages, setShowPackages] = useState(false);
		const selfieVerified = localStorage.getItem("selfieVerified") === "true";
		const hasPackage = localStorage.getItem("hasPackage") === "true";
		const gender = localStorage.getItem("gender");

		if (checkSelfie && !selfieVerified && gender == "man") {
      if (gender === "female") {
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
      if (gender === "male") {
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
			if (gender === "female") {
				return (
					<PackageSelectionModal
						isOpen={true}
						onClose={() => setShowPackages(false)}
					/>
				);
			}
			if (gender === "male") {
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
