import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useOfferDateMutation } from "../../network/services/ManAuth";
import { toast } from "react-toastify";

const OfferModal = ({ showofferModal, handleofferClose, womenId }) => {
  const [offerDate, requestResponse] = useOfferDateMutation();
  const [form, setForm] = useState({
    women_id: womenId,
    date: 0,
    time: 0,
    offer_price: 0,
    comment: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await offerDate(form);
		console.log(response);
		if (response.error) {
      toast.error(response.error.data.Message);
      handleofferClose();
    }

      // handleofferClose();
    } catch (err) {
      // handle error if needed
    }
  };

  return (
    <>
      <Modal
        show={showofferModal}
        className="offer_modal"
        onHide={handleofferClose}
        centered
      >
        <Modal.Header className="justify-content-center border-bottom-0">
          <Modal.Title className="secondary-medium-font level-7 extra-color-1">
            {" "}
            Create Offer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form onSubmit={handleSubmit}>
            <Row>
              <Col lg={12}>
                <div className="form-group">
                  <label
                    htmlFor="offer_price"
                    className="form-label secondary-secondmedium-font level-8"
                  >
                    Enter Desired Amount
                  </label>
                  <input
                    type="number"
                    name="offer_price"
                    value={form.offer_price}
                    onChange={handleChange}
                    placeholder="$200 to $2,000"
                    className="form-control"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group">
                  <label
                    htmlFor="date"
                    className="form-label secondary-secondmedium-font level-8"
                  >
                    Date
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={form.date}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </Col>
              <Col lg={6}>
                <div className="form-group">
                  <label
                    htmlFor="time"
                    className="form-label secondary-secondmedium-font level-8"
                  >
                    Time
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={form.time}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="form-group">
                  <label
                    htmlFor="comment"
                    className="form-label secondary-secondmedium-font level-8"
                  >
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    id="comment"
                    cols="30"
                    rows="3"
                    className="form-control"
                    placeholder="Write here"
                    value={form.comment}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </Col>
            </Row>
            <div className="form-btn">
              <Button
                type="submit"
                variant="primary"
                className="btn-write1 offer-btn mt-0 w-100 radius-0 load-more-wrapper  d-flex align-items-center justify-content-center extra-bg-1 border-none text-decoration-none text-white"
                disabled={requestResponse?.isLoading}
              >
                {requestResponse?.isLoading ? "Submitting..." : "Offer Now"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default OfferModal;
