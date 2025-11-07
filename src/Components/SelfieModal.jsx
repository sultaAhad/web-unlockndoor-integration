import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useGetManDataQuery } from "../network/services/ManAuth";
import { useWomanDataQuery } from "../network/services/WomanAuth";
import FaceVerification from "./FaceVerification";

const SelfieModal = ({ isOpen, onClose, onVerified }) => {
	const gender = localStorage.getItem("gender");
	const navigate = useNavigate();

	const { data: manData, refetch: manDataRefetch } = useGetManDataQuery(
		undefined,
		{
			skip: gender !== "men",
		},
	);
	const { data: womanData, refetch: womanDataRefetch } = useWomanDataQuery(
		undefined,
		{
			skip: gender !== "women",
		},
	);

	let user = null;
	if (gender === "men") {
		user = manData?.response?.data?.data;
	} else if (gender === "women") {
		user = womanData?.response?.data?.women;
	}

	const profileImageUrl =
		user?.profile_image_url || user?.profile_image || null;

	useEffect(() => {
		if (!isOpen) return;
		console.log("🟡 SelfieModal opened");
		console.log("📸 profileImageUrl:", profileImageUrl);
	}, [isOpen, profileImageUrl]);

	if (!isOpen || localStorage.getItem("selfieVerified") === "true") return null;

	return (
    <div className="modal-overlay">
      <div className="modal-box">
        {/* <button className="modal-close" onClick={onClose}>
					&times;
				</button> */}

        <h2 className="modal-title mb-0">Selfie Verification</h2>

        {profileImageUrl ? (
          <FaceVerification
            profileImageUrl={profileImageUrl}
            refetch={gender === "men" ? manDataRefetch : womanDataRefetch}
            onVerified={(status) => {
              if (status) {
                Swal.fire("Success", "Selfie verified!", "success").then(() => {
                  localStorage.setItem("selfieVerified", "true");
                  setTimeout(() => {
                    if (gender === "women") navigate("/women-profiles");
                    else if (gender === "men") navigate("/profile");
                    onVerified?.();
                    onClose();
                  }, 1500); // 1.5 second delay
                });
              }
            }}
          />
        ) : (
          <p style={{ marginTop: 20 }}>Loading your profile image...</p>
        )}

        <style jsx>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 11;
          }
          .modal-box {
            background: #fff;
            padding: 25px;
            border-radius: 12px;
            max-width: 500px;
            width: 90%;
            text-align: center;
            position: relative;
          }
          .modal-close {
            position: absolute;
            top: 10px;
            right: 15px;
            background: transparent;
            border: none;
            font-size: 26px;
            cursor: pointer;
          }
          .modal-title {
            margin-bottom: 15px;
            font-size: 20px;
            font-weight: bold;
          }
        `}</style>
      </div>
    </div>
  );
};

export default SelfieModal;
