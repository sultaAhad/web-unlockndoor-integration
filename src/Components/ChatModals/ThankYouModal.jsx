import { Modal, Button } from "react-bootstrap";
import { useEffect } from "react";

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
			<Modal.Header closeButton>
				<Modal.Title>Thank You!</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<p>Your payment was successful. You can now make video calls!</p>
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
