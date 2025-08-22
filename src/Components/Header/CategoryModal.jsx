import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import Swal from "sweetalert2";
import { validateSubscriptionForm } from "../../Constant/HelperFunction";
import { useSendSubscriptionQueryMutation } from "../../network/services/HelpServices";

const CategoryModal = ({
	showcategoryModal,
	handlecategoryClose,
	defaultGender,
}) => {
	const [values, setValues] = useState({
		name: "",
		email: "",
		phone: "",
		gender: defaultGender || "", // hidden
		interest: defaultGender || "", // will be sent to backend
	});
	const [errors, setErrors] = useState({});

	const [sendSubscriptionQuery, { isLoading }] =
		useSendSubscriptionQueryMutation();

	useEffect(() => {
		if (defaultGender) {
			setValues((prev) => ({
				...prev,
				gender: defaultGender,
				interest: defaultGender, // sync interest with gender
			}));
		}
	}, [defaultGender]);

	const handleChange = (e) => {
		setValues({ ...values, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (validateSubscriptionForm(values, setErrors)) {
			try {
				const formData = new FormData();
				for (let key in values) {
					formData.append(key, values[key]);
				}

				const response = await sendSubscriptionQuery(formData).unwrap();

				if (response.status) {
					Swal.fire(
						"Success!",
						response.message || "Your message has been sent.",
						"success",
					);
					setValues({
						name: "",
						email: "",
						phone: "",
						gender: "",
						interest: "",
					});
					setErrors({});
					handlecategoryClose();
				} else {
					Swal.fire(
						"Error!",
						response.message || "Something went wrong.",
						"error",
					);
				}
			} catch (error) {
				const apiMessage =
					error?.data?.["Error messages"]?.[0] ||
					error?.data?.message ||
					"Something went wrong. Please try again later.";
				Swal.fire("Error!", apiMessage, "error");
			}
		}
	};

	return (
		<Modal
			show={showcategoryModal}
			className="category_modal"
			onHide={handlecategoryClose}
			centered
		>
			<Modal.Body className="text-center p-4">
				<form onSubmit={handleSubmit}>
					<div className="form-group mb-3">
						<input
							type="text"
							name="name"
							value={values.name}
							onChange={handleChange}
							placeholder="Name"
							className="form-control"
						/>
						{errors.name && (
							<small className="text-danger">{errors.name[0]}</small>
						)}
					</div>

					<div className="form-group mb-3">
						<input
							type="email"
							name="email"
							value={values.email}
							onChange={handleChange}
							placeholder="Email Address"
							className="form-control"
						/>
						{errors.email && (
							<small className="text-danger">{errors.email[0]}</small>
						)}
					</div>

					<div className="form-group mb-3">
						<input
							type="number"
							name="phone"
							value={values.phone}
							onChange={handleChange}
							placeholder="Contact Number"
							className="form-control"
						/>
						{errors.phone && (
							<small className="text-danger">{errors.phone[0]}</small>
						)}
					</div>
					{/* Hidden gender */}
					<input type="hidden" name="gender" value={values.gender} />

					<div className="form-group mb-3">
						<select
							name="interest"
							value={values.interest}
							onChange={handleChange}
							className="form-select form-control custom-select-arrow"
						>
							<option value="">interest?</option>
							<option value="male">Male</option>
							<option value="female">Female</option>
						</select>
						{errors.interest && (
							<small className="text-danger">{errors.interest[0]}</small>
						)}
					</div>

					<div className="form-btn">
						<Button
							type="submit"
							variant="primary"
							className="border radius-8 py-3 w-100"
							disabled={isLoading}
						>
							{isLoading ? "Submitting..." : "Submit"}
						</Button>
					</div>
				</form>
			</Modal.Body>
		</Modal>
	);
};

export default CategoryModal;
