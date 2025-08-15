import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

const RejectModal = ({ show, onClose, onSubmit }) => {
	const [amount, setAmount] = useState("");
	const [reason, setReason] = useState("");

	const handleSubmit = () => {
		if (!amount || !reason) {
			alert("Please fill all fields");
			return;
		}
		onSubmit({ amount, reason });
		setAmount("");
		setReason("");
		onClose();
	};

	return (
		<Modal
			isOpen={show}
			onRequestClose={onClose}
			contentLabel="Reject Request"
			style={customStyles}
			
		>
			<h4 className="text-danger text-center extra-color-1 mb-2 secondary-medium-font">
				Reject Offer
			</h4>
			<p className="text-center mb-3 secondary-secondmedium-font secondary-medium-font level-7">
				Are you sure you want to Reject?
			</p>

			<label className="secondary-secondmedium-font level-8 dark-color mb-2">
				Enter Desired Amount
			</label>
			<input
				type="text"
				placeholder="$200 to $2,000"
				className="form-control mb-3 wt-wpsd"
				value={amount}
				onChange={(e) => setAmount(e.target.value)}
			/>

			<label className="secondary-secondmedium-font level-8  dark-color mb-2">
				Reason
			</label>
			<textarea
				className="form-control mb-4 wra-texterea-resize wt-wpsd"
				placeholder="Write here......"
				rows="4"
				value={reason}
				onChange={(e) => setReason(e.target.value)}
			></textarea>

			<button
				className="btn extra-bg-1 radius-8 text-white secondary-secondregular-font w-100"
				onClick={handleSubmit}
			>
				Reject Now
			</button>
		</Modal>
	);
};

export default RejectModal;

const customStyles = {
	content: {
		top: "50%",
		left: "50%",
		right: "auto",
		bottom: "auto",
		marginRight: "-50%",
		transform: "translate(-50%, -50%)",
		width: "400px",
		padding: "30px",
		borderRadius: "10px",
	},
	overlay: {
		backgroundColor: "#35353596",
		zIndex: 1000,
		backdropFilter: "blur(1px)", // <-- this is your blur
		WebkitBackdropFilter: "blur(1px)", // for Safari support
	},
	
};
