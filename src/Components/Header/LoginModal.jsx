import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setUserToken } from "../../network/reducers/AuthReducer";
import { useManLoginMutation } from "../../network/services/ManAuth";
import { useWomenLoginMutation } from "../../network/services/WomanAuth";
import { validatelogin } from "../../Constant/HelperFunction";
import { useNavigate } from "react-router-dom";

const LoginModal = ({ show, onClose, onForgotPassword }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userToken = useSelector((state) => state.auth.userToken);

	// Active Tab: men or women
	const [activeTab, setActiveTab] = useState("men");

	// Form states
	const [menLogin, setMenLogin] = useState({ email: "", password: "" });
	const [womenLogin, setWomenLogin] = useState({ email: "", password: "" });
	const [loginErrors, setLoginErrors] = useState({});
	const [rememberMe, setRememberMe] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const [manLogin, manResponse] = useManLoginMutation();
	const [womenLoginMutation, womenResponse] = useWomenLoginMutation();

	useEffect(() => {
		if (userToken) {
			onClose();
		}
	}, [userToken]);

	const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

	const handleSubmit = (e) => {
		e.preventDefault();
		const currentLogin = activeTab === "men" ? menLogin : womenLogin;

		if (!validatelogin(currentLogin, setLoginErrors)) return;

		const formData = new FormData();
		formData.append("email", currentLogin.email);
		formData.append("password", currentLogin.password);

		if (activeTab === "men") manLogin(formData);
		else womenLoginMutation(formData);
	};

	useEffect(() => {
		const response = activeTab === "men" ? manResponse : womenResponse;

		if (response?.isSuccess) {
			const responseData = response?.data?.response?.data;
			const apiData =
				activeTab === "men" ? responseData?.men : responseData?.women;
			const token = responseData?.token;

			if (!apiData || !token) {
				Swal.fire("Error", "Invalid response format", "error");
				return;
			}

			// ✅ Redux overwrite
			dispatch(
				setUserToken({
					user: apiData,
					token: token,
					remember: rememberMe,
					gender: activeTab,
				}),
			);

			// ✅ LocalStorage overwrite
			localStorage.setItem("token", token);
			localStorage.setItem("user", JSON.stringify(apiData));
			localStorage.setItem("gender", activeTab);
			localStorage.setItem("selfieVerified", responseData?.selfie_verified);
			localStorage.setItem("hasPackage", responseData?.package);

			// ✅ Navigation
			if (activeTab === "men") navigate("/profile");
			else navigate("/women-profiles");

			// ✅ Reset form
			if (activeTab === "men") setMenLogin({ email: "", password: "" });
			else setWomenLogin({ email: "", password: "" });

			onClose();
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
	}, [manResponse, womenResponse, activeTab]);

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

						{/* Tabs */}
						<div className="login-tabs mb-3 d-flex justify-content-center">
							<button
								type="button"
								className={`tab-btn ${activeTab === "men" ? "active" : ""}`}
								onClick={() => setActiveTab("men")}
							>
								Men
							</button>
							<button
								type="button"
								className={`tab-btn ${activeTab === "women" ? "active" : ""}`}
								onClick={() => setActiveTab("women")}
							>
								Women
							</button>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="login_input">
								<div className="login_email">
									<input
										type="email"
										placeholder="Email"
										value={
											activeTab === "men" ? menLogin.email : womenLogin.email
										}
										onChange={(e) =>
											activeTab === "men"
												? setMenLogin({ ...menLogin, email: e.target.value })
												: setWomenLogin({
														...womenLogin,
														email: e.target.value,
												  })
										}
									/>
									<div className="login_icon_dv">
										<i className="fa fa-envelope" />
									</div>
									{loginErrors?.email && (
										<small className="mt-2 text-danger">
											{loginErrors.email[0]}
										</small>
									)}
								</div>

								<div className="login_password">
									<input
										type={showPassword ? "text" : "password"}
										placeholder="Password"
										value={
											activeTab === "men"
												? menLogin.password
												: womenLogin.password
										}
										onChange={(e) =>
											activeTab === "men"
												? setMenLogin({ ...menLogin, password: e.target.value })
												: setWomenLogin({
														...womenLogin,
														password: e.target.value,
												  })
										}
									/>
									<div
										className="login_icon_dv"
										style={{ cursor: "pointer" }}
										onClick={() => togglePasswordVisibility()}
									>
										<i
											className={`fa ${
												showPassword ? "fa-eye" : "fa-eye-slash"
											}`}
										/>
									</div>
									{loginErrors?.password && (
										<small className="mt-2 text-danger">
											{loginErrors.password[0]}
										</small>
									)}
								</div>
							</div>

							<div className="remember_dv d-flex justify-content-between align-items-center">
								<div className="remeber">
									<label className="d-flex align-items-center gap-2 mb-0">
										<input
											type="checkbox"
											checked={rememberMe}
											style={{ width: "fit-content" }}
											onChange={(e) => setRememberMe(e.target.checked)}
										/>{" "}
										Remember me
									</label>
								</div>
								<div className="forgot_pass">
									<a
										href="#"
										onClick={(e) => {
											e.preventDefault();
											onForgotPassword(activeTab);
										}}
									>
										Forgot Password?
									</a>
								</div>
							</div>

							<div className="login_btn mt-3">
								<button
									className="submit_signup_btn w-100 main-wrapper-btn-wrap mt-2 border text-center px-3 gradient-button"
									type="submit"
									disabled={
										activeTab === "men"
											? manResponse.isLoading
											: womenResponse.isLoading
									}
								>
									{activeTab === "men"
										? manResponse.isLoading
											? "Signing In..."
											: "Sign In"
										: womenResponse.isLoading
										? "Signing In..."
										: "Sign In"}
								</button>
							</div>
						</form>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default LoginModal;
