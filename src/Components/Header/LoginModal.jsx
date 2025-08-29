import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { setUserToken } from "../../network/reducers/AuthReducer";
import { useManLoginMutation } from "../../network/services/ManAuth";
import { useWomenLoginMutation } from "../../network/services/WomanAuth";
import { validatelogin } from "../../Constant/HelperFunction";
import SelfieModal from "../SelfieModal";
import ManPackagesTab from "../ManPackagesTab";
import { useNavigate } from "react-router-dom";
import WomenselfieModel from "../WomenselfieModel";
import PackageSelectionModal from "../PackageSelectionModal";

const LoginModal = ({ show, onClose, onForgotPassword }) => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const userToken = useSelector((state) => state.auth.userToken);

	// Active Tab: male or female
	const [activeTab, setActiveTab] = useState("male");

	// Form states
	const [maleLogin, setMaleLogin] = useState({ email: "", password: "" });
	const [femaleLogin, setFemaleLogin] = useState({ email: "", password: "" });
	const [loginErrors, setLoginErrors] = useState({});
	const [rememberMe, setRememberMe] = useState(false);

	// Password visibility
	const [showPassword, setShowPassword] = useState(false);

	// Modals
	const [showSelfie, setShowSelfie] = useState(false);
	const [showPackages, setShowPackages] = useState(false);
	const [showWomenSelfie, setShowWomenSelfie] = useState(false);
	const [showWomenPackage, setShowWomenPackage] = useState(false);

	// API mutations
	const [manLogin, manResponse] = useManLoginMutation();
	const [womenLogin, womenResponse] = useWomenLoginMutation();

	// Close login modal if already logged in
	useEffect(() => {
		if (userToken) {
			onClose();
		}
	}, [userToken]);

	const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

	const handleSubmit = (e) => {
		e.preventDefault();
		const currentLogin = activeTab === "male" ? maleLogin : femaleLogin;

		if (!validatelogin(currentLogin, setLoginErrors)) return;

		const formData = new FormData();
		formData.append("email", currentLogin.email);
		formData.append("password", currentLogin.password);

		if (activeTab === "male") manLogin(formData);
		else womenLogin(formData);
	};

	// Handle API responses
	useEffect(() => {
		const response = activeTab === "male" ? manResponse : womenResponse;

		if (response?.isSuccess) {
			const apiData =
				activeTab === "male"
					? response?.data?.response?.data?.men
					: response?.data?.response?.data?.women;

			const token = response?.data?.response?.data?.token;

			if (!apiData || !token) {
				Swal.fire("Error", "Invalid response format", "error");
				return;
			}

			dispatch(
				setUserToken({
					user: apiData,
					token: token,
					remember: rememberMe,
				}),
			);

			Swal.fire(
				"Success",
				response?.data?.message || "Login successful",
				"success",
			).then(() => {
				if (activeTab === "male") {
					if (apiData.selfie_verified && apiData.package) {
						navigate("/profile"); // dono true → direct profile
					} else if (!apiData.selfie_verified) {
						setShowSelfie(true); // sirf selfie missing → selfie modal only
					} else if (!apiData.package) {
						setShowPackages(true); // sirf package missing → package modal
					}
				} else {
					if (apiData.selfie_verified && apiData.package) {
						navigate("/women-profile");
					} else if (!apiData.selfie_verified) {
						setShowWomenSelfie(true);
					} else if (!apiData.package) {
						setShowWomenPackage(true);
					}
				}
			});

			// Reset form
			if (activeTab === "male") setMaleLogin({ email: "", password: "" });
			else setFemaleLogin({ email: "", password: "" });

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

	const handleSelfieVerified = () => {
		setShowSelfie(false);
		const apiData = manResponse?.data?.response?.data?.men;

		if (apiData?.package) {
			// agar package already true hai → direct navigate
			navigate("/profile");
		} else {
			// agar package false hai → tabhi package modal kholna
			setShowPackages(true);
		}
	};

	const handleWomenSelfieVerified = () => {
		setShowWomenSelfie(false);
		const apiData = womenResponse?.data?.response?.data?.women;

		if (apiData?.package) {
			navigate("/women-profile");
		} else {
			setShowWomenPackage(true);
		}
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

						{/* Tabs */}
						<div className="login-tabs mb-3 d-flex justify-content-center">
							<button
								type="button"
								className={`tab-btn ${activeTab === "male" ? "active" : ""}`}
								onClick={() => setActiveTab("male")}
							>
								Male
							</button>
							<button
								type="button"
								className={`tab-btn ${activeTab === "female" ? "active" : ""}`}
								onClick={() => setActiveTab("female")}
							>
								Female
							</button>
						</div>

						<form onSubmit={handleSubmit}>
							<div className="login_input">
								<div className="login_email">
									<input
										type="email"
										placeholder="Email"
										value={
											activeTab === "male" ? maleLogin.email : femaleLogin.email
										}
										onChange={(e) =>
											activeTab === "male"
												? setMaleLogin({ ...maleLogin, email: e.target.value })
												: setFemaleLogin({
														...femaleLogin,
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
											activeTab === "male"
												? maleLogin.password
												: femaleLogin.password
										}
										onChange={(e) =>
											activeTab === "male"
												? setMaleLogin({
														...maleLogin,
														password: e.target.value,
												  })
												: setFemaleLogin({
														...femaleLogin,
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

							<div className="login_btn mt-3">
								<button
									className="submit_signup_btn w-100 main-wrapper-btn-wrap mt-2 border text-center px-3 gradient-button"
									type="submit"
									disabled={
										activeTab === "male"
											? manResponse.isLoading
											: womenResponse.isLoading
									}
								>
									{activeTab === "male"
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

			{/* Male Modals */}
			{showSelfie && (
				<SelfieModal
					isOpen={showSelfie}
					onClose={() => setShowSelfie(false)}
					onVerified={handleSelfieVerified}
				/>
			)}
			{showPackages && (
				<ManPackagesTab
					isOpen={showPackages}
					onClose={() => setShowPackages(false)}
				/>
			)}

			{/* Female Modals */}
			{showWomenSelfie && (
				<WomenselfieModel
					isOpen={showWomenSelfie}
					onClose={() => setShowWomenSelfie(false)}
					onVerified={handleWomenSelfieVerified}
				/>
			)}
			{showWomenPackage && (
				<PackageSelectionModal
					isOpen={showWomenPackage}
					onClose={() => setShowWomenPackage(false)}
				/>
			)}
		</>
	);
};

export default LoginModal;
