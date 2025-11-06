import React, { useState } from "react";
import { Button, Col, Modal, Row } from "react-bootstrap";
import { useReOfferDateMutation } from "../../network/services/ManAuth";
import { toast } from "react-toastify";

const ReofferModal = ({ offer, showreofferModal, handlereofferClose }) => {
  const [reOfferDate, requestResponse] = useReOfferDateMutation();
  const [form, setForm] = useState({
    date_id: offer?.id,
    offer_price: 0,
    comment: null,
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (parseInt(form.offer_price) <= parseInt(offer.offer_price)) {
        toast.error("Offer price must be above last offer price");
        return;
      }

      let response = await reOfferDate(form);
      if (response.data?.status) {
        toast.success(response.data?.message);
      }
      if (response.error) {
        toast.error(response.error.data.Message);
      }
      handlereofferClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Modal
        show={showreofferModal}
        className="offer_modal"
        onHide={handlereofferClose}
        centered
      >
        <Modal.Header className="justify-content-center border-0 pb-0">
          <Modal.Title className="secondary-medium-font level-7 extra-color-1">
            {" "}
            Reoffer
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <form onSubmit={handleFormSubmit}>
            <Row>
              <Col lg={12}>
                <div className="form-group position-relative">
                  <label htmlFor="" className="form-label">
                    Last Offer
                  </label>
                  <input
                    type="text"
                    placeholder={offer?.offer_price}
                    className="form-control pe-5"
                    readOnly
                  />
                  <span className="offer_span position-absolute level-8 secondary-secondmedium-font extra-color-1">
                    Rejected
                  </span>
                </div>
              </Col>
              <Col lg={12}>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Enter New Offer
                  </label>
                  <input
                    type="number"
                    minLength={offer?.offer_price + 1}
                    required
                    name="offer_price"
                    onChange={(e) => {
                      setForm((pre) => ({
                        ...pre,
                        offer_price: e.target.value,
                      }));
                    }}
                    placeholder="$200 to $2,000"
                    className="form-control"
                  />
                </div>
              </Col>
              <Col lg={12}>
                <div className="form-group">
                  <label htmlFor="" className="form-label">
                    Comment
                  </label>
                  <textarea
                    name="comment"
                    onChange={(e) => {
                      setForm((pre) => ({
                        ...pre,
                        comment: e.target.value,
                      }));
                    }}
                    id=""
                    cols="30"
                    rows="3"
                    className="form-control"
                    placeholder="Write here...."
                  ></textarea>
                </div>
              </Col>
            </Row>
            <div className="form-btn">
              <Button
                variant="primary"
                type="submit"
                disabled={requestResponse?.isLoading}
                className="btn-write1 offer-btn mt-0 w-100 radius-0 load-more-wrapper  d-flex align-items-center justify-content-center extra-bg-1 border-none text-decoration-none text-white"
              >
                {requestResponse?.isLoading ? "Processing" : "Offer Now"}
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ReofferModal;
