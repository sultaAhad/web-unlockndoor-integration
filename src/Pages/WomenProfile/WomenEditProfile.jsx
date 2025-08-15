import React, { useEffect, useRef, useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer";
import Aos from "aos";
import {
	womenproimg,
	womenproimg1,
	uploader_icon,
	solar_calendar,
	innerpages1,
} from "../../Constant/Index";
import { Link } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function WomenEditProfile() {
	const [dateOfBirth, setDateOfBirth] = useState(new Date());
	const [chips, setChips] = useState(["Gaming", "Movies", "Sports"]);
	const [bannerImage, setBannerImage] = useState(womenproimg);
	const [profileImage, setProfileImage] = useState(womenproimg1);
	const [videos, setVideos] = useState([]);
	const [galleryImages, setGalleryImages] = useState([]);

	const bannerInputRef = useRef(null);
	const profileInputRef = useRef(null);

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
		if (chip && !chips.includes(chip)) {
			setChips([...chips, chip]);
		}
	};

	const handleRemoveChip = (chip) => {
		setChips(chips.filter((c) => c !== chip));
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
										<h5>John Smith</h5>
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
															placeholder="phone"
															required
														/>
													</div>
												</div>
												<div className="col-md-4">
													<div className="form-group ">
														<input
															type="text"
															placeholder="Your Name"
															required
														/>
													</div>
												</div>

												<div className="col-md-4">
													<div className="form-group position-relative">
														<DatePicker
															selected={dateOfBirth}
															onChange={(date) => setDateOfBirth(date)}
															placeholderText="Date Of Birth (DOB must match the ID given)"
															dateFormat="dd/MM/yyyy"
															className="custom_datePicker"
														/>
														<div className="input_icons">
															<img src={solar_calendar} alt="" />
														</div>
													</div>
												</div>

												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															placeholder="Body Type"
															required
														/>
													</div>
												</div>

												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															placeholder="Address"
															required
														/>
													</div>
												</div>

												<div className="col-md-4">
													<div className="form-group">
														<input type="text" placeholder="Height" required />
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
															required
														/>
													</div>
												</div>
												<div className="col-md-4">
													<div className="form-group">
														<input
															type="text"
															placeholder="Nationality"
															required
														/>
													</div>
												</div>
												<div className="col-lg-4">
													<div className="form-group">
														<div className="chips">
															{chips.map((chip) => (
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
													<Link to="/profile" className="radius-8">
														<button type="submit" className="border radius-8">
															Save
														</button>
													</Link>
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

			<Footer />
		</>
	);
}

export default WomenEditProfile;
