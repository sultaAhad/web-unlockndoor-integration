import React from "react";
import { Button, Modal } from "react-bootstrap";
import { tick_circle } from "../../Constant/Index";

const ThankYouModal = ({
	showThankModal,
	handleThankClose,
	setShowThankModal,
	setShowVideoChatModal,
}) => {
	const handleVideoChat = () => {
		setShowThankModal(false);
		setShowVideoChatModal(true);
	};

	return (
		<>
			<Modal
				show={showThankModal}
				className="congrats_modal"
				onHide={handleThankClose}
				centered
			>
				<Modal.Header
					onClick={handleVideoChat}
					closeButton
					className="border-0"
				>
					{" "}
					<div className="congrat_img">
						<img src={tick_circle} alt="" className="img-fluid" />
					</div>
					{/* <Button onClick={handleVideoChat}>123</Button> */}
				</Modal.Header>
				<Modal.Body className="text-center">
					<h3 className="secondary-semibold-font font_level3 text-black mt-3">
						Congratulation
					</h3>
					<p className="font_reg secondary-light-font dark-color mb-0">
						Payment has been successfully Completed
					</p>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default ThankYouModal;
