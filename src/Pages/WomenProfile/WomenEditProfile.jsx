import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";
import {
	uploader_icon,
	solar_calendar,
	innerpages1,
} from "../../Constant/Index";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { useWomenEditProfileMutation } from "../../network/services/WomanAuth";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { setUser } from "../../network/reducers/AuthReducer";
import ImageVideo from "../../Components/ImageVideo";

function WomenEditProfile() {
	const { user } = useSelector((state) => state.auth);
	const navigate = useNavigate();
	const dispatch = useDispatch();
	console.log(user, "user");
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [chips, setChips] = useState(["Gaming", "Movies", "Sports"]);
	const [bannerImage, setBannerImage] = useState(user?.cover_images_url);
	const [profileImage, setProfileImage] = useState(user?.profile_image_url);
	const [videos, setVideos] = useState([]);
	const [galleryImages, setGalleryImages] = useState([]);

	const bannerInputRef = useRef(null);
	const profileInputRef = useRef(null);

	const [editProfile, { data, isSuccess, isError, error, isLoading }] =
		useWomenEditProfileMutation();

	const [form, setForm] = useState({
		name: user?.name,
		phone: user?.phone,
		// date_of_birth: user?.date_of_birth,
		date_of_birth: user?.date_of_birth ? new Date(user.date_of_birth) : null,
		height: user?.height,
		body_type: user?.body_type,
		address: user?.address,
		hair_color: user?.hair_color,
		nationality: user?.nationality,
		images: user?.images_urls,
		videos: user?.videos_urls,
		skills: user?.skills?.split(",")?.map((skill) => skill.trim()) || [],
	});

	const handleChange = (e) => {
		const value = e.target.value;
		setForm({ ...form, [e.target.name]: value });
	};

	console.log(form, "skills");

	const handleBannerChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setBannerImage(URL.createObjectURL(file));
		}
	};

	const handleProfileChange = (e) => {
		const file = e.target.files[0];
		if (file) {
			setProfileImage(URL.createObjectURL(file));
		}
	};

	const handleAddChip = (chip) => {
		if (chip && !form.skills.includes(chip)) {
			setForm((prev) => ({
				...prev,
				skills: [...prev.skills, chip],
			}));
		}
	};

	const handleRemoveChip = (chip) => {
		setForm((prev) => ({
			...prev,
			skills: prev.skills.filter((c) => c !== chip),
		}));
	};

	const handleFileChange = (e, type) => {
		const selectedFiles = Array.from(e.target.files);
		if (type === "gallery") {
			setGalleryImages((prev) => [...prev, ...selectedFiles]);
		} else if (type === "videos") {
			setVideos((prev) => [...prev, ...selectedFiles]);
		}
	};

	const removeFile = (index, type) => {
		switch (type) {
			case "gallery":
				setGalleryImages(galleryImages.filter((_, i) => i !== index));
				break;
			case "videos":
				setVideos(videos.filter((_, i) => i !== index));
				break;
			default:
				break;
		}
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
	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages1})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.minHeight = "100vh";

		return () => {
			document.body.style.backgroundImage = "";
		};
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		let data = new FormData();
		data.append("name", form?.name);
		data.append("phone", form?.phone);
		// data.append("date_of_birth", form?.date_of_birth);
		const formattedDOB = form?.date_of_birth
			? format(new Date(form.date_of_birth), "yyyy-MM-dd")
			: "";
		data.append("date_of_birth", formattedDOB);
		data.append("height", form?.height);
		data.append("body_type", form?.body_type);
		data.append("address", form?.address);
		data.append("hair_color", form?.hair_color);
		data.append("nationality", form?.nationality);
		galleryImages?.map((item, index) => {
			return data.append(`images[${index}]`, item);
		});
		videos?.map((item, index) => {
			return data.append(`videos[${index}]`, item);
		});

		if (form?.skills && Array.isArray(form.skills)) {
			data.append("skills", form.skills.join(","));
		} else {
			data.append("skills", "");
		}

		editProfile(data);
	};

	// useEffect(() => {
	// 	if (isSuccess) {
	// 		Swal.fire({
	// 			title: "Success!",
	// 			text: "Profile updated successfully!",
	// 			icon: "success",
	// 			confirmButtonText: "OK",
	// 		}).then(() => {
	// 			if (data?.response) {
	// 				// console.log(data?.response);
	// 				dispatch(setUser(data?.response?.data));
	// 			}
	// 			navigate("/women-profiles");
	// 		});
	// 	}

	// 	if (isError) {
	// 		Swal.fire({
	// 			title: "Error!",
	// 			text: error?.data?.message || "Something went wrong!",
	// 			icon: "error",
	// 			confirmButtonText: "OK",
	// 		});
	// 	}
	// }, [isSuccess, isError, data, error, dispatch, navigate]);

	useEffect(() => {
		if (isSuccess) {
			Swal.fire({
				title: "Success!",
				text: "Profile updated successfully!",
				icon: "success",
				confirmButtonText: "OK",
			}).then(() => {
				if (data?.response) {
					dispatch(setUser(data?.response?.data));
				}
				navigate("/women-profiles");
			});
		}

		// if (isError) {
		// 	const errorMessage = error?.data?.message || "Something went wrong!";
		// 	// General error alert
		// 	Swal.fire({
		// 		title: "Error!",
		// 		text: errorMessage,
		// 		icon: "error",
		// 		confirmButtonText: "OK",
		// 	});

		// 	// Loop through errors and show them per field
		// 	if (error?.data?.errors && Array.isArray(error?.data?.errors)) {
		// 		error?.data?.errors.forEach((err) => {
		// 			if (err.field && err.message) {
		// 				Swal.fire({
		// 					title: `${err.field} Error!`,
		// 					text: err.message,
		// 					icon: "error",
		// 					confirmButtonText: "OK",
		// 				});
		// 			}
		// 		});
		// 	}
		// }
	}, [isSuccess, data, dispatch, navigate]);

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
										src={bannerImage}
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
										<img
											src={profileImage}
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
										<h5>{user?.name}</h5>
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
												{/* Gallery Images Upload */}
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
														<div className="col-lg-10">
															<label className="mt-1">
																Note :{" "}
																<span className="label_span">
																	make sure you got the best of your
																	attractiveness and qualities
																</span>
															</label>
														</div>
														{galleryImages.length > 0 &&
															renderPreviews(galleryImages, "gallery")}
													</div>
												</div>

												{/* Videos Upload */}
												<div className="col-md-4">
													<div className="form-group upload-section mt-2">
														<label>introduction video at least 2 </label>
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
														{videos.length > 0 &&
															renderPreviews(videos, "videos")}
													</div>
												</div>
												<div className="col-md-4">
													<div className="form-group mt-5">
														<input
															type="number"
															name="phone"
															onChange={handleChange}
															placeholder="phone"
															value={form?.phone}
															required
														/>
														{console.log(
															error?.data?.errors?.phone,
															"response",
														)}
														{error?.data?.errors?.phone && (
															<div className="text-danger">
																{error?.data?.errors?.phone?.[0]}
															</div>
														)}
													</div>
												</div>
												<div className="col-md-4">
													<div className="form-group ">
														<input
															type="text"
															name="name"
															onChange={handleChange}
															placeholder="Your Name"
															value={form?.name}
															required
														/>
														{error?.data?.errors?.name && (
															<div className="text-danger">
																{error?.data?.errors?.name?.[0]}
															</div>
														)}
													</div>
												</div>

												<div className="col-md-4">
													{/* <div className="form-group">
														<input
															type="date"
															value={form?.date_of_birth}
															required
														/>
													</div> */}
													<div className="form-group position-relative">
														<DatePicker
															selected={
																form?.date_of_birth
																	? new Date(form.date_of_birth)
																	: null
															}
															onChange={(date) =>
																setForm({ ...form, date_of_birth: date })
															}
															placeholderText="Date Of Birth (DOB must match the ID given)"
															dateFormat="dd/MM/yyyy"
															className="custom_datePicker"
															maxDate={new Date()}
															showYearDropdown
															scrollableYearDropdown
															yearDropdownItemNumber={100}
														/>
														<div className="input_icons">
															<img src={solar_calendar} alt="" />
														</div>
														{error?.data?.errors?.date_of_birth && (
															<div className="text-danger">
																{error?.data?.errors?.date_of_birth?.[0]}
															</div>
														)}
													</div>
												</div>

												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															name="body_type"
															onChange={handleChange}
															value={form?.body_type}
															placeholder="Body Type"
															required
														/>
														{error?.data?.errors?.body_type && (
															<div className="text-danger">
																{error?.data?.errors?.body_type?.[0]}
															</div>
														)}
													</div>
												</div>

												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															placeholder="Address"
															name="address"
															onChange={handleChange}
															value={form?.address}
															required
														/>
														{error?.data?.errors?.address && (
															<div className="text-danger">
																{error?.data?.errors?.address?.[0]}
															</div>
														)}
													</div>
												</div>

												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															placeholder="Height"
															name="height"
															onChange={handleChange}
															value={form?.height}
															required
														/>
														{error?.data?.errors?.height && (
															<div className="text-danger">
																{error?.data?.errors?.height?.[0]}
															</div>
														)}
													</div>
												</div>
												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															placeholder="what are your talents and skills?"
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
												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															placeholder="Hair Color"
															name="hair_color"
															onChange={handleChange}
															value={form?.hair_color}
															required
														/>
														{error?.data?.errors?.hair_color && (
															<div className="text-danger">
																{error?.data?.errors?.hair_color?.[0]}
															</div>
														)}
													</div>
												</div>
												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															placeholder="Nationality"
															name="nationality"
															onChange={handleChange}
															value={form?.nationality}
															required
														/>
														{error?.data?.errors?.nationality && (
															<div className="text-danger">
																{error?.data?.errors?.nationality?.[0]}
															</div>
														)}
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
													{/* <Link to="/profile" className="radius-8"> */}
													<button
														type="button"
														onClick={handleSubmit}
														className="border radius-8"
														disabled={isLoading}
													>
														{!isLoading ? "Save" : "Loading..."}
													</button>
													{/* </Link> */}
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
							<ImageVideo key={index} file={image} type="image" />
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
							<ImageVideo key={index} file={video} type="video" />
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
