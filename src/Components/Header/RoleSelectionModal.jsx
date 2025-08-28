import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { w_img, ww_img } from "../../Constant/Index";
import { Link } from "react-router-dom";

const RoleSelectionModal = ({ show, onClose, onLoginClick }) => {
	return (
		<>
			<Modal
				show={show}
				onHide={onClose}
				size="md"
				className="border-radius-www  wrapper-centered "
				centered
			>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body>
					<div className="header_modal_all">
						<h4 className="mb-0 secondary-secondsemibold-font level-7">
							Please Select Your Role
						</h4>
						<p>
							Lorem ipsum dolor sit amet, consect adipiscing elit, sed sit dolor
						</p>
						<div className="header_both_button">
							<Link to="/women-registration">
								<Button className="my_header_button wrapper-hideen">
									<span className="move-icon">
										<img src={w_img} alt="" />
									</span>
									Women
								</Button>
							</Link>
							<Link to="/man-registration">
								<Button className=" wrapper-hideen wrapper-centered-wrapppp hide_border">
									<span className="move-icon">
										<img src={ww_img} alt="" />
									</span>
									Men
								</Button>
							</Link>
						</div>
						<h6 className="mt-2 mb-2 secondary-secondsemibold-font">
							Already have an account?{" "}
						</h6>
						<Button
							className="main-wrapper-btn-wrap mt-2 border text-center px-3 gradient-button"
							variant="secondary"
							onClick={onLoginClick}
						>
							Login Now
						</Button>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default RoleSelectionModal;
