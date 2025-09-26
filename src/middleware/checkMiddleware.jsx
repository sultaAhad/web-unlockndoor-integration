import { useState } from "react";
import SelfieModal from "../Components/SelfieModal";
import ManPackagesTab from "../Components/ManPackagesTab";
import PackageSelectionModal from "../Components/PackageSelectionModal";

export function checkMiddleware(
  Component,
  checkSelfie = false,
  checkPackage = false
) {
  return function ProtectedComponent(props) {
    const [showSelfie, setShowSelfie] = useState(false);
    const [showPackages, setShowPackages] = useState(false);

    const hasPackage = localStorage.getItem("hasPackage") === "true";
    const selfieVerified = localStorage.getItem("selfieVerified") === "true";
    const gender = localStorage.getItem("gender"); // expect "men" or "women"

    // ✅ Check package subscription
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

    // ✅ Check selfie verification (now using the single SelfieModal for both genders)
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
