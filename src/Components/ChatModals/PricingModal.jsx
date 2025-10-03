import { Button, Modal } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useGetManVideoChargesQuery } from "../../network/services/ManAuth";

const PricingModal = ({
	showPricingModal,
	handlePricingClose,
	setShowPricingModal,
	setShowPayModal,
	setSelectedPlan,
}) => {
	const { data, isLoading } = useGetManVideoChargesQuery();
	const [selectedId, setSelectedId] = useState(null);



	const handlePayNowOpen = () => {
		if (!selectedId) {
			alert("Please select a plan first");
			return;
		}

		// ✅ Find the selected plan
		const plan = data?.data?.find((p) => p.id === selectedId);

		// ✅ Set selected plan for PayNowModal
		setSelectedPlan(plan);

		// ✅ Close PricingModal and open PayNowModal
		setShowPricingModal(false);
		setShowPayModal(true);
	};

	return (
    <Modal
      show={showPricingModal}
      onHide={handlePricingClose}
      centered
      className="pricing_modal"
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Video Call Pricing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {isLoading ? (
          <p>Loading...</p>
        ) : data?.data?.length > 0 ? (
          <form>
            {data.data.map((plan) => (
              <div className="form-group pb-1" key={plan.id}>
                <label
                  className="form-label d-flex align-items-center"
                  htmlFor={`plan-${plan.id}`}
                >
                  <input
                    type="radio"
                    id={`plan-${plan.id}`}
                    name="main"
                    hidden
                    checked={selectedId === plan.id}
                    onChange={() => setSelectedId(plan.id)}
                  />
                  <span className="checkmark"></span>${plan.price} for{" "}
                  {plan.minutes} minutes
                </label>
              </div>
            ))}
          </form>
        ) : (
          <p>Pls Upgrade Packages</p>
        )}
      </Modal.Body>
      <Modal.Footer className="border-0 pt-0">
        <Button variant="primary" className="w-100" onClick={handlePayNowOpen}>
          Pay Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PricingModal;
