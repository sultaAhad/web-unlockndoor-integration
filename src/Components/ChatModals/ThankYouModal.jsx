import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";
import { tick_circle } from "../../Constant/Index";

const ThankYouModal = ({
	showThankModal,
	setShowThankModal,
	setShowVideoButton,
	refetchManData,
}) => {
	useEffect(() => {
		if (showThankModal) {
			// Show video button after payment
			setShowVideoButton(true);
			// Refresh man data from API
			refetchManData();
		}
	}, [showThankModal]);

	return (
		<Modal
			show={showThankModal}
			onHide={() => setShowThankModal(false)}
			centered
		>
			<Modal.Header closeButton className="border-0">
				<div className="congrat_img">
					<img src={tick_circle} alt="" className="img-fluid" />
				</div>{" "}
			</Modal.Header>
			<Modal.Body className="text-center">
				<h3 className="secondary-semibold-font font_level3 text-black mt-3">
					Congratulation
				</h3>
				<p className="font_reg secondary-light-font dark-color mb-0">
					Payment has been successfully Completed
				</p>{" "}
			</Modal.Body>
			<Modal.Footer>
				<Button variant="primary" onClick={() => setShowThankModal(false)}>
					Close
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ThankYouModal;
