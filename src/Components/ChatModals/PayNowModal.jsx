// PayNowModal.js
import React from "react";
import { Modal } from "react-bootstrap";
import Stripwrapper from "./Stripwrapper";

const PayNowModal = ({
  show,
  onHide,
  checkedPlan,
  showSuccessModal,
  setShowSuccessModal,
  memberId,
  stripeWrapperResponse, // ✅ receive here
}) => {
  return (
    <Modal
      show={show}
      onHide={onHide}
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>
          Pay Now - ${checkedPlan?.price} ({checkedPlan?.minutes} mins)
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {checkedPlan ? (
          // PayNowModal.js
          <Stripwrapper
            checkedTerm={checkedPlan}
            showSuccessModal={showSuccessModal}
            setShowSuccessModal={setShowSuccessModal}
            memberId={memberId}
            checkoutFormResponse={(response) => {
              stripeWrapperResponse(response);
            }}
          />
        ) : (
          <p className="text-center text-muted">
            Please select a package to proceed
          </p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default PayNowModal;
