import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Swal from "sweetalert2";
import { validateChangePassword } from "../../Constant/HelperFunction";
import { useResetPasswordMutation } from "../../network/services/ManAuth";
import { useResetPasswordWomenMutation } from "../../network/services/WomanAuth";

const NewPasswordModal = ({ show, onClose, role, email }) => {
	const [form, setForm] = useState({
		email: email || "",
		password: "",
		confirmPassword: "",
	});
	const [errors, setErrors] = useState({});
	const [showPassword, setShowPassword] = useState([false, false]);

	const [ResetPassword, { isLoading: isMenLoading }] =
		useResetPasswordMutation();
	const [ResetPasswordWomen, { isLoading: isWomenLoading }] =
		useResetPasswordWomenMutation();

	const loading = isMenLoading || isWomenLoading;

	useEffect(() => {
		if (email) {
			setForm((prev) => ({ ...prev, email }));
		}
	}, [email]);

	const togglePasswordVisibility = (index) => {
		const updated = [...showPassword];
		updated[index] = !updated[index];
		setShowPassword(updated);
	};

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async () => {
		if (!validateChangePassword(form, setErrors)) return;

		try {
			const payload = {
				email: form.email,
				password: form.password,
				confirmPassword: form.confirmPassword, // or password_confirmation if backend requires
			};

			let res;
			if (role === "men") {
				res = await ResetPassword(payload).unwrap();
			} else {
				res = await ResetPasswordWomen(payload).unwrap();
			}

			Swal.fire({
				icon: "success",
				title: "Success",
				text: res.message || "Password updated successfully!",
			});

			onClose();
			setForm({ email: "", password: "", confirmPassword: "" });
		} catch (err) {
			let errorMsg = "Something went wrong";

			if (err?.data?.message) {
				if (typeof err.data.message === "string") {
					errorMsg = err.data.message;
				} else if (typeof err.data.message === "object") {
					const firstKey = Object.keys(err.data.message)[0];
					errorMsg = err.data.message[firstKey][0];
				}
			}

			Swal.fire({
				icon: "error",
				title: "Oops...",
				text: errorMsg,
			});
		}
	};

	return (
		<Modal show={show} centered onHide={onClose} className="border-radius-www">
			<Modal.Header closeButton></Modal.Header>
			<Modal.Body className="p-4">
				<div className="login_head">
					<h3 className="secondary-semibold-font">New Password</h3>
					<h5>Enter Your Details</h5>
				</div>

				<div className="login_modal_all">
					{/* Email */}
					<div className="login_input ">
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={form.email}
							onChange={handleChange}
							readOnly // ✅ prevent user from changing it
						/>
						{errors.email && <p className="text-danger">{errors.email[0]}</p>}
					</div>

					{/* Password & Confirm */}
					{["password", "confirmPassword"].map((field, index) => (
						<div className="login_input" key={field}>
							<div className="login_password position-relative">
								<input
									type={showPassword[index] ? "text" : "password"}
									name={field}
									value={form[field]}
									onChange={handleChange}
									placeholder={
										index === 0 ? "New Password" : "Confirm New Password"
									}
								/>
								<div
									className="login_icon_dv"
									style={{ cursor: "pointer" }}
									onClick={() => togglePasswordVisibility(index)}
								>
									<i
										className={`fa ${
											showPassword[index] ? "fa-eye" : "fa-eye-slash"
										}`}
									/>
								</div>
							</div>
							{errors[field] && (
								<p className="text-danger">{errors[field][0]}</p>
							)}
						</div>
					))}

					<div className="login_btn">
						<Button
							className="border"
							onClick={handleSubmit}
							variant="primary"
							disabled={loading}
						>
							{loading ? "Updating..." : "Update"}
						</Button>
					</div>
				</div>
			</Modal.Body>
		</Modal>
	);
};

export default NewPasswordModal;
