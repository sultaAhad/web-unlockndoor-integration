import React from "react";
import { Modal } from "react-bootstrap";

const VidePlayModal = ({ showModal, setShowModal, handleModalClose }) => {
	return (
		<>
			<Modal show={showModal} onHide={handleModalClose} centered>
				<Modal.Body className="p-0">
					<div className="ratio ratio-16x9">
						<iframe
							src="https://www.youtube.com/embed/video-id"
							title="Video Player"
							allowFullScreen
							frameBorder="0"
						></iframe>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default VidePlayModal;
