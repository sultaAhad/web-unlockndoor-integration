import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";
import {
	calenderwrapper1,
	edit,
	massagewrapper,
	notification,
	uploader_icon,
} from "../../Constant/Index";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useSelector } from "react-redux";
import {
	useManupUatepPofileImageMutation,
	useUpdateManCoverImageMutation,
} from "../../network/services/AuthServices";

function Meneditprofile() {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();

	const [form, setForm] = useState({
		name: user?.name || "",
		email: user?.email || "",
		annual_income: user?.income || "",
		date_of_birth: user?.date_of_birth ? new Date(user.date_of_birth) : null,
		skills: Array.isArray(user?.skills) ? user.skills : [], // 🔑 always an array
		message: user?.message || "",
		occupation: user?.occupation || "",
		height: user?.height || "",
		bannerImage: user?.cover_image_url || null,
		profileImage: user?.profile_image_url || null,
		galleryImages: [],
		videos: [],
	});

	const [manupUatepPofileImage] = useManupUatepPofileImageMutation();
	const [updateManCoverImage] = useUpdateManCoverImageMutation();

	const bannerInputRef = useRef(null);
	const profileInputRef = useRef(null);

	// ===== Image Handlers =====
	const handleBannerChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append("cover_image", file);
			await updateManCoverImage(formData);
			setForm((prev) => ({ ...prev, bannerImage: URL.createObjectURL(file) }));
		}
	};

	const handleProfileChange = async (e) => {
		const file = e.target.files[0];
		if (file) {
			const formData = new FormData();
			formData.append("profile_image", file);
			await manupUatepPofileImage(formData);
			setForm((prev) => ({ ...prev, profileImage: URL.createObjectURL(file) }));
		}
	};

	// ===== Chips (Skills) =====
	const handleAddChip = (chip) => {
		if (chip && !form.skills.includes(chip)) {
			setForm((prev) => ({ ...prev, skills: [...prev.skills, chip] }));
		}
	};

	const handleRemoveChip = (chip) => {
		setForm((prev) => ({
			...prev,
			skills: prev.skills.filter((c) => c !== chip),
		}));
	};

	// ===== Files Upload =====
	const handleFileChange = (e, type) => {
		const selectedFiles = Array.from(e.target.files);
		setForm((prev) => ({
			...prev,
			[type === "gallery" ? "galleryImages" : "videos"]: [
				...prev[type === "gallery" ? "galleryImages" : "videos"],
				...selectedFiles,
			],
		}));
	};

	const removeFile = (index, type) => {
		setForm((prev) => ({
			...prev,
			[type]: prev[type].filter((_, i) => i !== index),
		}));
	};

	const renderPreviews = (files, type) => (
		<div className="preview-container d-flex flex-wrap gap-3 mt-2">
			{files.map((file, index) => (
				<div key={index} className="position-relative">
					{type === "videos" ? (
						<video
							src={URL.createObjectURL(file)}
							width={100}
							height={100}
							controls
							className="rounded object-cover"
						/>
					) : (
						<img
							src={URL.createObjectURL(file)}
							alt="preview"
							width={100}
							height={100}
							className="rounded object-cover"
						/>
					)}
					<button
						type="button"
						className="position-absolute d-flex align-items-center justify-content-center top-0 end-0 bg-danger text-white rounded-circle border-0"
						style={{ width: 20, height: 20, fontSize: 14 }}
						onClick={() => removeFile(index, type)}
					>
						✖
					</button>
				</div>
			))}
		</div>
	);

	useEffect(() => {
		Aos.init({ duration: 1000, once: true });
	}, []);

	// ===== Input Change =====
	const handleChange = (e) => {
		const { name, value } = e.target;
		setForm((prev) => ({ ...prev, [name]: value }));
	};

	// ===== Submit Handler =====
	const handleSubmit = (e) => {
		e.preventDefault();

		if (form.galleryImages.length < 5) {
			alert("Please upload at least 5 pictures.");
			return;
		}
		if (form.videos.length < 2) {
			alert("Please upload at least 2 introduction videos.");
			return;
		}

		console.log("Final Data:", form);
		// TODO: Send form data via API
		navigate("/profile");
	};

	return (
		<>
			<Header />

			{/* Banner + Profile Section */}
			<section className="profile_sec pt-5 pb-5" data-aos="fade-up">
				<div className="container">
					<div className="profile_banner_img position-relative">
						<img
							src={form?.bannerImage}
							className="img-fluid banner_img"
							alt="Banner"
						/>
						<div className="camera-wrapper-pp position-absolute bottom-0 right-0 m-3">
							<button
								type="button"
								className="btn p-0"
								onClick={() => bannerInputRef.current.click()}
							>
								<i className="fa-solid fa-camera"></i>
							</button>
							<input
								type="file"
								ref={bannerInputRef}
								onChange={handleBannerChange}
								accept="image/*"
								hidden
							/>
						</div>

						<div className="profile_img_div">
							<div className="position-relative text-center">
								<img
									src={form?.profileImage}
									className="img-fluid profile_imgg"
									alt="Profile"
								/>
								<div className="camera-wrapper-pp wrapp-camera-po position-absolute bottom-50">
									<button
										type="button"
										className="btn p-0"
										onClick={() => profileInputRef.current.click()}
									>
										<i className="fa-solid fa-camera"></i>
									</button>
									<input
										type="file"
										ref={profileInputRef}
										onChange={handleProfileChange}
										accept="image/*"
										hidden
									/>
								</div>
								<h5>{form?.name || "John Smith"}</h5>
							</div>
						</div>

						<div className="account_access_dv">
							<div className="notify_edit_dv">
								<ul>
									<Link
										className="text-decoration-none text-white secondary-secondregular-font"
										to="/chat-women"
									>
										<li className="wrapper-navigate-main position-relative">
											<img src={massagewrapper} alt="" /> <span>Message</span>
											<span className="number_move_dv">21</span>
										</li>
									</Link>
									<Link to="/men-notifications">
										<li className="position-relative">
											<img src={notification} alt="Notification" />
											<span className="number_move_dv">19</span>
										</li>
									</Link>
									<Link to="/man-settings">
										<li>
											<img src={edit} alt="Edit" />
										</li>
									</Link>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Edit Form */}
			<div className="register_sec py-5">
				<div className="container">
					<div className="profile_dv">
						<form onSubmit={handleSubmit}>
							<div className="row form_control_all">
								{/* Name */}
								<div className="col-md-4">
									<div className="form-group">
										<input
											type="text"
											placeholder="Your Name"
											required
											name="name"
											value={form?.name}
											onChange={handleChange}
										/>
									</div>
								</div>

								{/* Date of Birth */}
								<div className="col-md-4">
									<div className="form-group position-relative">
										<DatePicker
											selected={form?.date_of_birth}
											onChange={(date) =>
												setForm((prev) => ({ ...prev, date_of_birth: date }))
											}
											placeholderText="Date Of Birth (DOB must match ID)"
											dateFormat="dd/MM/yyyy"
											className="custom_datePicker"
										/>
										<div className="input_icons">
											<img src={calenderwrapper1} alt="" />
										</div>
									</div>
								</div>

								{/* Purpose */}
								<div className="col-md-4">
									<div className="form-group">
										<input
											type="text"
											placeholder="Purpose"
											name="purpose"
											value={form?.purpose || ""}
											onChange={handleChange}
										/>
									</div>
								</div>

								{/* Income */}
								<div className="col-md-4">
									<div className="form-group">
										<input
											type="text"
											placeholder="Annual Income"
											name="annual_income"
											value={form?.annual_income}
											onChange={handleChange}
										/>
									</div>
								</div>

								{/* Height */}
								<div className="col-md-4">
									<div className="form-group">
										<input
											type="text"
											placeholder="Height"
											name="height"
											value={form?.height}
											onChange={handleChange}
										/>
									</div>
								</div>

								{/* Skills Input */}
								<div className="col-md-4">
									<div className="form-group">
										<input
											type="text"
											placeholder="Your talents and skills?"
											onKeyDown={(e) => {
												if (e.key === "Enter") {
													e.preventDefault();
													handleAddChip(e.target.value);
													e.target.value = "";
												}
											}}
										/>
									</div>
								</div>

								{/* Message */}
								<div className="col-md-4">
									<div className="form-group">
										<textarea
											style={{ borderRadius: "10px" }}
											className="form_input-2 input_border w-100"
											rows="4"
											value={form?.message}
											placeholder="Message"
											onChange={handleChange}
											name="message"
										/>
									</div>
								</div>

								{/* Occupation */}
								<div className="col-md-4">
									<div className="form-group">
										<input
											type="text"
											placeholder="Occupation"
											name="occupation"
											value={form?.occupation}
											onChange={handleChange}
										/>
									</div>
								</div>

								{/* Skills Chips Display */}
								<div className="col-lg-4">
									<div className="form-group">
										<div className="chips d-flex gap-2 flex-wrap">
											{Array.isArray(form.skills) &&
												form.skills.map((chip) => (
													<div
														key={chip}
														className="chip px-2 py-1 border rounded bg-light"
													>
														{chip}
														<span
															className="ms-2 text-danger"
															onClick={() => handleRemoveChip(chip)}
															style={{ cursor: "pointer" }}
														>
															&times;
														</span>
													</div>
												))}
										</div>
									</div>
								</div>

								{/* Gallery Upload */}
								<div className="col-md-4">
									<div className="form-group upload-section mt-2">
										<label>Upload 5 pictures minimum</label>
										<div className="uploader py-3 rounded mt-2">
											<div className="upload_pic text-center">
												<div className="content_uploader">
													<img
														src={uploader_icon}
														alt=""
														className="img-fluid"
													/>
													<p className="secondary-secondsemibold-font">
														Upload here
													</p>
												</div>
											</div>
											<input
												type="file"
												accept="image/*"
												multiple
												className="uploader_file"
												onChange={(e) => handleFileChange(e, "gallery")}
											/>
										</div>
										{form.galleryImages.length > 0 &&
											renderPreviews(form.galleryImages, "gallery")}
									</div>
								</div>

								{/* Videos Upload */}
								<div className="col-md-4">
									<div className="form-group upload-section mt-2">
										<label>Upload at least 2 introduction videos</label>
										<div className="uploader py-3 rounded mt-2">
											<div className="upload_pic text-center">
												<div className="content_uploader">
													<img
														src={uploader_icon}
														alt=""
														className="img-fluid"
													/>
													<p className="secondary-secondsemibold-font">
														Upload here
													</p>
												</div>
											</div>
											<input
												type="file"
												accept="video/*"
												multiple
												className="uploader_file"
												onChange={(e) => handleFileChange(e, "videos")}
											/>
										</div>
										{form.videos.length > 0 &&
											renderPreviews(form.videos, "videos")}
									</div>
								</div>

								{/* Save Button */}
								<div className="col-md-4 align-content-center">
									<button
										type="submit"
										className=" border radius-8 secondary-regular-font"
									>
										Save
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<Footer />
		</>
	);
}

export default Meneditprofile;
