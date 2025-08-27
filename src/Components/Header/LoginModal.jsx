import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setUserToken } from "../../network/reducers/AuthReducer";
import { useManLoginMutation } from "../../network/services/ManAuth";
import { validatelogin } from "../../Constant/HelperFunction";
import SelfieModal from "../SelfieModal";
import ManPackagesTab from "../ManPackagesTab";

const LoginModal = ({ show, onClose, onForgotPassword }) => {
	const dispatch = useDispatch();
	const userToken = useSelector((state) => state.auth.userToken);

	const [showPassword, setShowPassword] = useState(false);
	const [login, setLogin] = useState({ email: "", password: "" });
	const [loginErrors, setLoginErrors] = useState({});
	const [rememberMe, setRememberMe] = useState(false);
	const [showSelfie, setShowSelfie] = useState(false);
	const [showPackages, setShowPackages] = useState(false);

	const [manLogin, response] = useManLoginMutation();

	// ✅ Prevent login modal if user already logged in
	useEffect(() => {
		if (userToken) {
			console.log("🔹 User already logged in:", userToken);
			onClose();
		}
	}, [userToken]);

	const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!validatelogin(login, setLoginErrors)) return;

		const formData = new FormData();
		formData.append("email", login.email);
		formData.append("password", login.password);

		manLogin(formData);
	};

	useEffect(() => {
		if (response?.isSuccess) {
			const apiData = response?.data?.response?.data;

			if (!apiData?.men || !apiData?.token) {
				Swal.fire("Error", "Invalid response format", "error");
				return;
			}

			dispatch(
				setUserToken({
					user: apiData.men,
					token: apiData.token,
					remember: rememberMe,
				}),
			);

			console.log("✅ Login Success, Redux + localStorage updated");

			setLogin({ email: "", password: "" });
			setLoginErrors({});
			onClose();

			Swal.fire(
				"Success",
				response?.data?.message || "Login successful",
				"success",
			).then(() => setShowSelfie(true));
		}

		if (response?.isError) {
			const errorMessage =
				response?.error?.data?.message ||
				Object.values(response?.error?.data?.errors || {})
					.flat()
					.join("\n") ||
				"Login failed";
			Swal.fire("Error", errorMessage, "error");
		}
	}, [response]);

	const handleSelfieVerified = () => {
		setShowSelfie(false);
		setShowPackages(true);
	};

	return (
		<>
			<Modal
				show={show}
				centered
				onHide={onClose}
				className="border-radius-www"
			>
				<Modal.Header closeButton></Modal.Header>
				<Modal.Body className="p-4">
					<div className="login_modal_all">
						<div className="login_head1">
							<h3 className="secondary-semibold-font">Login</h3>
							<h5>Welcome Back</h5>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="login_input">
								<div className="login_email">
									<input
										type="email"
										placeholder="Email"
										value={login.email}
										onChange={(e) =>
											setLogin({ ...login, email: e.target.value })
										}
									/>
									<div className="login_icon_dv">
										<i className="fa fa-envelope" />
									</div>
									{loginErrors?.email && <small className="mt-2 text-danger">{loginErrors.email[0]}</small>}
								</div>

								<div className="login_password">
									<input
										type={showPassword ? "text" : "password"}
										placeholder="Password"
										value={login.password}
										onChange={(e) =>
											setLogin({ ...login, password: e.target.value })
										}
									/>
									<div
										className="login_icon_dv"
										style={{ cursor: "pointer" }}
										onClick={togglePasswordVisibility}
									>
										<i
											className={`fa ${
												showPassword ? "fa-eye" : "fa-eye-slash"
											}`}
										/>
									</div>
									{loginErrors?.password && (
										<small className="mt-2 text-danger">{loginErrors.password[0]}</small>
									)}
								</div>
							</div>

							<div className="remember_dv">
								<div className="remeber">
									<input
										type="checkbox"
										checked={rememberMe}
										onChange={(e) => setRememberMe(e.target.checked)}
									/>{" "}
									<label>Remember me</label>
								</div>
								<div className="forgot_pass">
									<a href="#" onClick={onForgotPassword}>
										Forgot Password?
									</a>
								</div>
							</div>
							<div className="login_btn">
								<button
									className="mt-2 border text-center d-flex align-items-center justify-content-center submit_signup_btn"
									type="submit"
									disabled={response.isLoading}
								>
									{response.isLoading ? "Signing In..." : "Sign In"}
								</button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>

			{showSelfie && (
				<SelfieModal
					isOpen={showSelfie}
					onClose={() => setShowSelfie(false)}
					onVerified={handleSelfieVerified}
				/>
			)}

			{showPackages && (
				<ManPackagesTab
					show={showPackages}
					handleClose={() => setShowPackages(false)}
				/>
			)}
		</>
	);
};

export default LoginModal;
