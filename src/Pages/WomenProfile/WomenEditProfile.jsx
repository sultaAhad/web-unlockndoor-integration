import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";
import { calenderwrapper1, uploader_icon } from "../../Constant/Index";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { setUser } from "../../network/reducers/AuthReducer";
import {
	useDeleteImageWomanMutation,
	useDeleteVideoWomanMutation,
	useUpdateCoverImageWomenMutation,
	useUpdateProfileImageWomenMutation,
	useWomanDataQuery,
	useWomenEditProfileMutation,
} from "../../network/services/WomanAuth";
import ImageVideo from "../../Components/ImageVideo";

function WomenEditProfile() {
	const { data, refetch } = useWomanDataQuery();
	const user = data?.response?.data?.women;
	console.log(user);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const bannerInputRef = useRef(null);
	const profileInputRef = useRef(null);
	const imagesInputRef = useRef(null);
	const videosInputRef = useRef(null);

	const parseValidDate = (dateString) => {
		const date = new Date(dateString);
		return isNaN(date.getTime()) ? null : date;
	};

	const parsedSkills = user?.skills
		? Array.isArray(user.skills)
			? user.skills
			: user.skills.split(",").map((s) => s.trim())
		: [];

	const [form, setForm] = useState({
		name: user?.name || "",
		phone: user?.phone || "",
		date_of_birth: parseValidDate(user?.date_of_birth) || null,
		height: user?.height || "",
		body_type: user?.body_type || "",
		address: user?.address || "",
		hair_color: user?.hair_color || "",
		nationality: user?.nationality || "",
		skills: parsedSkills || [],
		bannerImage: user?.cover_images_url || "",
		profileImage: user?.profile_image_url || "",
		images: user?.images_urls || [],
		videos: user?.videos_urls || [],
	});

	const [formErrors, setFormErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [imageFiles, setImageFiles] = useState([]);
	const [videoFiles, setVideoFiles] = useState([]);

	const [updateProfileImage] = useUpdateProfileImageWomenMutation();
	const [updateCoverImage] = useUpdateCoverImageWomenMutation();
	const [editProfile] = useWomenEditProfileMutation();
	const [deleteImageWomen] = useDeleteImageWomanMutation();
	const [deleteVideoWomen] = useDeleteVideoWomanMutation();

	const today = new Date();
	const minAgeDate = new Date(
		today.getFullYear() - 18,
		today.getMonth(),
		today.getDate(),
	);

	// ===== Banner Upload =====
	const handleBannerChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const localPreview = URL.createObjectURL(file);
		setForm((prev) => ({ ...prev, bannerImage: localPreview }));

		try {
			const formData = new FormData();
			formData.append("cover_images", file);

			const response = await updateCoverImage(formData).unwrap();
			if (response.data?.cover_images_url) {
				setForm((prev) => ({
					...prev,
					bannerImage: response.data.cover_images_url,
				}));
				dispatch(
					setUser({ ...user, cover_images_url: response.data.cover_image_url }),
				);
				refetch();
				Swal.fire({
					icon: "success",
					title: "Success!",
					text: "Cover image updated successfully!",
					timer: 2000,
					showConfirmButton: false,
				});
			}
		} catch (error) {
			console.error("Failed to update cover image:", error);
			Swal.fire({
				icon: "error",
				title: "Upload Failed",
				text:
					error.data?.message ||
					"Failed to update cover image. Please try again.",
			});
		}
	};

	// ===== Profile Upload =====
	const handleProfileChange = async (e) => {
		const file = e.target.files[0];
		if (!file) return;

		const localPreview = URL.createObjectURL(file);
		setForm((prev) => ({ ...prev, profileImage: localPreview }));

		try {
			const formData = new FormData();
			formData.append("profile_image", file);

			const response = await updateProfileImage(formData).unwrap();
			if (response.data?.profile_image_url) {
				setForm((prev) => ({
					...prev,
					profileImage: response.data.profile_image_url,
				}));
				dispatch(
					setUser({
						...user,
						profile_image_url: response.data.profile_image_url,
					}),
				);
				refetch();
				Swal.fire({
					icon: "success",
					title: "Success!",
					text: "Profile image updated successfully!",
					timer: 2000,
					showConfirmButton: false,
				});
			}
		} catch (error) {
			console.error("Failed to update profile image:", error);
			Swal.fire({
				icon: "error",
				title: "Upload Failed",
				text:
					error.data?.message ||
					"Failed to update profile image. Please try again.",
			});
		}
	};

	// ===== Skills =====
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

	// ===== Upload files =====
	const handleFileChange = (e, type) => {
		const selectedFiles = Array.from(e.target.files);
		const urls = selectedFiles.map((file) => URL.createObjectURL(file));

		if (type === "images") {
			setImageFiles((prev) => [...prev, ...selectedFiles]);
			setForm((prev) => ({ ...prev, images: [...prev.images, ...urls] }));
		} else if (type === "videos") {
			setVideoFiles((prev) => [...prev, ...selectedFiles]);
			setForm((prev) => ({ ...prev, videos: [...prev.videos, ...urls] }));
		}
	};

	const removeFile = async (index, type) => {
		try {
			let formData = new FormData();

			if (type === "images") {
				const fileUrl = form.images[index];
				const fileName = fileUrl.split("/").pop();
				formData.append("image", fileName);

				const response = await deleteImageWomen(formData).unwrap();
				if (response.status === 200) {
					setForm((prev) => ({
						...prev,
						images: prev.images.filter((_, i) => i !== index),
					}));
					Swal.fire({
						icon: "success",
						title: "Deleted!",
						text: "Image deleted successfully.",
						timer: 1500,
						showConfirmButton: false,
					});
				}
			} else if (type === "videos") {
				const fileUrl = form.videos[index];
				const fileName = fileUrl.split("/").pop();
				formData.append("video", fileName);

				const response = await deleteVideoWomen(formData).unwrap();
				if (response.status === 200) {
					setForm((prev) => ({
						...prev,
						videos: prev.videos.filter((_, i) => i !== index),
					}));
					Swal.fire({
						icon: "success",
						title: "Deleted!",
						text: "Video deleted successfully.",
						timer: 1500,
						showConfirmButton: false,
					});
				}
			}
			refetch();
		} catch (error) {
			console.error("Failed to remove file:", error);
			Swal.fire({
				icon: "error",
				title: "Error",
				text: error.data?.message || "Could not delete, please try again.",
				confirmButtonText: "OK",
			});
		}
	};

	// ===== Validation =====
	const validateForm = () => {
		const errors = {};
		if (!form.name?.trim()) errors.name = "Name is required";
		if (!form.date_of_birth) errors.date_of_birth = "Date of Birth is required";
		else if (form.date_of_birth >= new Date())
			errors.date_of_birth = "Date of Birth must be before today";
		if (!form.skills.length) errors.skills = "At least one skill is required";
		if (!form.bannerImage && !bannerInputRef.current?.files[0])
			errors.bannerImage = "Cover image is required";
		if (!form.profileImage && !profileInputRef.current?.files[0])
			errors.profileImage = "Profile image is required";
		if (imageFiles.length + (user?.images_urls?.length || 0) < 5)
			errors.images = "At least 5 images are required";
		if (videoFiles.length + (user?.videos_urls?.length || 0) < 2)
			errors.videos = "At least 2 videos are required";

		return errors;
	};

	// ===== Submit =====
	const handleSubmit = async (e) => {
		e.preventDefault();
		setFormErrors({});
		const errors = validateForm();
		if (form.date_of_birth > minAgeDate) {
			errors.date_of_birth = `Date of birth must be minimum ${minAgeDate}`;
		}

		if (Object.keys(errors).length > 0) {
			setFormErrors(errors);

			Swal.fire({
				icon: "error",
				title: "Validation Error",
				text: "Please fill all required fields correctly",
			});
			return;
		}

		setIsSubmitting(true);
		try {
			const formData = new FormData();
			formData.append("name", form.name);
			formData.append("phone", form.phone);
			formData.append(
				"date_of_birth",
				form.date_of_birth.toISOString().split("T")[0],
			);
			formData.append("skills", form.skills.join(","));

			if (profileInputRef.current?.files[0])
				formData.append("profile_image", profileInputRef.current.files[0]);
			if (bannerInputRef.current?.files[0])
				formData.append("cover_images", bannerInputRef.current.files[0]);

			imageFiles.forEach((file) => formData.append("images[]", file));
			videoFiles.forEach((file) => formData.append("videos[]", file));

			const response = await editProfile(formData).unwrap();

			if (response.status === 200) {
				const updatedData = response.response.data;
				dispatch(setUser(updatedData));
				refetch();
				setForm((prev) => ({
					...prev,
					images: updatedData.images_urls,
					videos: updatedData.videos_urls,
				}));

				Swal.fire({
					icon: "success",
					title: "Profile Updated!",
					showConfirmButton: false,
					timer: 2000,
				}).then(() => navigate("/women-profiles"));
			}
		} catch (error) {
			console.error("Failed to update profile:", error);
			Swal.fire({
				icon: "error",
				title: "Update Failed",
				text:
					error.data?.message || "Failed to update profile. Please try again.",
			});
		} finally {
			setIsSubmitting(false);
		}
	};

	// ===== Sync user data =====
	useEffect(() => {
		if (user) {
			setForm({
				name: user.name || "",
				phone: user.phone || "",
				date_of_birth: parseValidDate(user.date_of_birth),
				height: user.height || "",
				body_type: user.body_type || "",
				address: user.address || "",
				hair_color: user.hair_color || "",
				nationality: user.nationality || "",
				skills: Array.isArray(user.skills)
					? user.skills
					: user.skills?.split(",") || [],
				bannerImage: user.cover_images_url || "",
				profileImage: user.profile_image_url || "",
				images: user.images_urls || [],
				videos: user.videos_urls || [],
			});
		}
	}, [user]);

	useEffect(() => {
		Aos.init({ duration: 1000, once: true });
	}, []);
	return (
		<>
			<Header />

			<section className="profile_sec pt-5 pb-5" data-aos="fade-up">
				<div className="container">
					<div className="row">
						<div className="col-md-12 pb-5">
							<div className="profile_banner_img">
								<div className="position-relative">
									<img
										src={form.bannerImage}
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
								</div>

								<div className="profile_img_div">
									<div className="position-relative text-center">
										<figure className="position-relative mb-0">
											<img
												src={form.profileImage}
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
										</figure>
										<h5>
											{(form?.name && form.name.length > 20
												? form.name.slice(0, 20) + "..."
												: form?.name) || "John Smith"}
										</h5>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className="register_sec py-5">
				<div className="container">
					<div className="profile_dv">
						<div className="row">
							<div className="col-md-12">
								<div className="edit-profile-form">
									<div className="form-container">
										<form>
											<div className="row form_control_all">
												{/* Images */}
												<div className="col-md-4">
													<div className="form-group upload-section upload-section11 mt-2">
														<label className="text-white">
															Upload 5 pictures minimum
														</label>
														<div className="uploader py-3 rounded mt-2 position-relative">
															<div className="upload_pic text-center">
																<div className="content_uploader">
																	<img
																		src={uploader_icon}
																		alt=""
																		className="img-fluid"
																	/>
																	<p className="secondary-secondsemibold-font text-white">
																		Upload here
																	</p>
																</div>
															</div>
															<input
																type="file"
																ref={imagesInputRef}
																accept="image/*"
																multiple
																onChange={(e) => handleFileChange(e, "images")}
															/>
														</div>
														<div className="preview-container d-flex flex-wrap gap-2 mt-2">
															{form.images.map((img, i) => (
																<div key={i} className="position-relative">
																	<img
																		src={img}
																		alt=""
																		className="preview-img preview-imgvide img-fluid"
																	/>
																	<span
																		className="position-absolute d-flex align-items-center justify-content-center top-0 end-0 bg-danger text-white rounded-circle border-0"
																		style={{
																			width: 20,
																			height: 20,
																			lineHeight: "14px",
																			fontSize: 14,
																			cursor: "pointer",
																		}}
																		onClick={() => removeFile(i, "images")}
																	>
																		&times;
																	</span>
																</div>
															))}
															<div class="col-lg-10">
																<label className="mt-1">
																	Note :{" "}
																	<span className="label_span">
																		make sure you got the best of your
																		attractiveness and qualities{" "}
																	</span>
																</label>
															</div>
															{formErrors.images && (
																<span className="text-danger">
																	{formErrors.images}
																</span>
															)}
														</div>
													</div>
												</div>
												{/* Videos */}
												<div className="col-md-4">
													<div className="form-group upload-section upload-section11 mt-2">
														<label className="text-white">
															Upload 2 videos minimum
														</label>
														<div className="uploader py-3 rounded mt-2 position-relative">
															<div className="upload_pic text-center">
																<div className="content_uploader">
																	<img
																		src={uploader_icon}
																		alt=""
																		className="img-fluid"
																	/>
																	<p className="secondary-secondsemibold-font text-white">
																		Upload here
																	</p>
																</div>
															</div>
															<input
																type="file"
																ref={videosInputRef}
																accept="video/*"
																multiple
																onChange={(e) => handleFileChange(e, "videos")}
															/>
														</div>
														<div className="preview-container d-flex flex-wrap gap-2 mt-2">
															{form.videos.map((vid, i) => (
																<div key={i} className="position-relative">
																	<video
																		src={vid}
																		className="preview-img preview-imgvide rounded object-cover"
																		controls
																	/>
																	<span
																		className="position-absolute d-flex align-items-center justify-content-center top-0 end-0 bg-danger text-white rounded-circle border-0"
																		style={{
																			width: 20,
																			height: 20,
																			lineHeight: "14px",
																			fontSize: 14,
																			cursor: "pointer",
																		}}
																		onClick={() => removeFile(i, "videos")}
																	>
																		&times;
																	</span>
																</div>
															))}
															{formErrors.videos && (
																<span className="text-danger">
																	{formErrors.videos}
																</span>
															)}
														</div>
													</div>
												</div>

												{/* Other Inputs */}
												{[
													"phone",
													"name",
													"height",
													"body_type",
													"address",
													"hair_color",
													"nationality",
												].map((field, index) => (
													<div
														className={`col-md-4 ${index === 0 ? "mt-5" : ""}`}
														key={field}
													>
														<div className="form-group">
															<input
																type="text"
																name={field}
																onChange={(e) =>
																	setForm({ ...form, [field]: e.target.value })
																}
																value={form?.[field]}
																placeholder={field
																	.replace("_", " ")
																	.toUpperCase()}
																required
															/>
														</div>
														{formErrors[field] && (
															<span className="text-danger">
																{formErrors[field]}
															</span>
														)}
													</div>
												))}

												{/* Date of Birth */}
												<div className="col-md-4">
													<div className="form-group position-relative">
														<DatePicker
															selected={form?.date_of_birth}
															onChange={(date) =>
																setForm({ ...form, date_of_birth: date })
															}
															placeholderText="Date Of Birth"
															dateFormat="dd/MM/yyyy"
															className="custom_datePicker"
															maxDate={minAgeDate}
															showYearDropdown
															scrollableYearDropdown
															yearDropdownItemNumber={100}
														/>
													</div>
													{formErrors.date_of_birth && (
														<span className="text-danger">
															{formErrors.date_of_birth}
														</span>
													)}
												</div>

												{/* Skills */}
												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															placeholder="What are your talents and skills?"
															onKeyDown={(e) => {
																if (e.key === "Enter") {
																	e.preventDefault();
																	handleAddChip(e.target.value.trim());
																	e.target.value = "";
																}
															}}
														/>
													</div>
												</div>
												<div className="col-lg-4">
													<div className="form-group">
														<div className="chips">
															{form?.skills.map((chip) => (
																<div key={chip} className="chip">
																	{chip}
																	<span onClick={() => handleRemoveChip(chip)}>
																		&times;
																	</span>
																</div>
															))}
														</div>
													</div>
												</div>

												<div className="col-md-4 align-content-start">
													<button
														type="button"
														onClick={handleSubmit}
														className="border radius-8 p-2 ps-3 pe-3 d-flex align-items-center gap-2"
														disabled={isSubmitting}
													>
														{isSubmitting && (
															<i className="fa fa-spinner fa-spin"></i>
														)}
														{isSubmitting ? "Saving..." : "Save"}
													</button>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Pictures section  */}
			<section className="pictures_sec" data-aos="fade-left">
				<div className="container">
					<div className="pic_head">
						<div className="d-flex justify-content-between">
							<h3>Pictures</h3>
						</div>
					</div>
					<div className="row mt-3">
						{user?.images_urls?.map((image, index) => (
							<ImageVideo
								key={index}
								file={image}
								type="image"
								refetch={refetch} // <-- yahan bhi pass karo
							/>
						))}
					</div>
				</div>
			</section>
			{/* ======================= */}

			{/* Video Seciton  */}
			<section className="videos_sec" data-aos="fade-right">
				<div className="container">
					<div className="pic_head">
						<div className=" d-flex  justify-content-between">
							<h3>Videos</h3>
						</div>
					</div>
					<div className="row mt-3">
						{user?.videos_urls?.map((video, index) => (
							<ImageVideo
								key={index}
								file={video}
								type="video"
								refetch={refetch} // <-- yahan bhi pass karo
							/>
						))}
					</div>
				</div>
			</section>
			{/* ============================ */}
			<Footer />
		</>
	);
}

export default WomenEditProfile;
