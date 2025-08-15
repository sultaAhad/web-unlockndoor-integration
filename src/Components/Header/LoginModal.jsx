import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const LoginModal = ({ show, onClose, onForgotPassword }) => {
	const [showPassword, setShowPassword] = useState(false);

	const togglePasswordVisibility = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<Modal show={show} centered onHide={onClose} className="border-radius-www">
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className="p-4">
				<div className="login_modal_all">
					<div className="login_head1">
						<h3 className="secondary-semibold-font">Login</h3>
						<h5>Welcome Back</h5>
					</div>
					<div className="login_input">
						<div className="login_email">
							<input
								type="email"
								placeholder="Email"
								className="pe-md-5 pe-4"
							/>
							<div className="login_icon_dv">
								<i className="fa fa-envelope" />
							</div>
						</div>
						<div className="login_password position-relative">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Password"
								className="pe-md-5 pe-4"
							/>
							<div
								className="login_icon_dv"
								style={{ cursor: "pointer" }}
								onClick={togglePasswordVisibility}
							>
								<i
									className={`fa ${showPassword ? "fa-eye" : "fa-eye-slash"}`}
								/>
							</div>
						</div>
					</div>
					<div className="remember_dv">
						<div className="remeber">
							<input type="checkbox" />
							<label>Remember me</label>
						</div>
						<div className="forgot_pass">
							<a href="#" onClick={onForgotPassword}>
								Forgot Password?
							</a>
						</div>
					</div>
					<div className="login_btn">
						<Link to="/women-profiles" className="text-decoration-none">
							{" "}
							<button className="mt-2 border text-center d-flex align-items-center justify-content-center submit_signup_btn">
								Sign In
							</button>
						</Link>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default LoginModal;
