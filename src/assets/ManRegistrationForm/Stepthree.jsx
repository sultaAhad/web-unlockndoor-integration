import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

import {
	imgregistaionfemale,
	innerpages2,
	right_arrow,
	tick,
	tick_circle,
	uploader_icon,
} from "../../Constant/Index";
import { Link } from "react-router-dom";

Modal.setAppElement("#root");

const Stepthree = ({ formData, setFormData }) => {
	const [text, setText] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
	const [coverPhoto, setCoverPhoto] = useState(null);
	const [galleryImages, setGalleryImages] = useState([]);
	const [videos, setVideos] = useState([]);

	const handleSubmit = (e) => {
		e.preventDefault();

		if (text.trim() === "") {
			toast.error("Please enter a message");
			return;
		}
		toast.success("Form submitted successfully!");
		setTimeout(() => setIsModalOpen(true), 2000);
	};

	const handleFileChange = (e, type) => {
		const files = Array.from(e.target.files);

		switch (type) {
			case "cover":
				setCoverPhoto(files[0]);
				break;
			case "gallery":
				setGalleryImages([...galleryImages, ...files]);
				break;
			case "videos":
				setVideos([...videos, ...files]);
				break;
			default:
				break;
		}
	};

	const removeFile = (index, type) => {
		switch (type) {
			case "cover":
				setCoverPhoto(null);
				break;
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

	const packages = [
		{
			title: "Free Tier",
			price: "No Payment Required",
			features: [
				"Swipe/Like up to 10 Profiles per Day",
				"View Pictures of Women",
				"View Videos for the first 10 Seconds",
			],
		},
		{
			title: "One-Time Payment",
			price: "$49.95",
			features: [
				"Sponsor Date Feature – Send offers for sponsored dates to women",
				"Access to Female Videos – View videos uploaded by all female users",
			],
		},
	];

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
						style={{ width: 20, height: 20, lineHeight: "14px", fontSize: 14 }}
						onClick={() => removeFile(index, type)}
					>
						✖
					</button>
				</div>
			))}
		</div>
	);
	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages2})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.minHeight = "100vh";

		return () => {
			document.body.style.backgroundImage = "";
		};
	}, []);
	return (
		<>
			<ToastContainer />

			<div className="register_sec py-5 pb-5">
				<div className="container">
					<div className="profile_dv1">
						<div className="row">
							<div className="col-md-6">
								<div className="edit-profile-form">
									<form onSubmit={handleSubmit}>
										<div className="form-group">
											<textarea
												style={{ borderRadius: "10px" }}
												className="form_input-2 input_border w-100"
												rows="4"
												value={text}
												onChange={(e) => setText(e.target.value)}
												placeholder="Message"
											/>
										</div>

										{/* Cover Photo Upload */}
										<div className="form-group upload-section mt-2">
											<label>Cover Photo</label>
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
													className="uploader_file"
													onChange={(e) => handleFileChange(e, "cover")}
												/>
											</div>
											{coverPhoto && renderPreviews([coverPhoto], "cover")}
										</div>

										{/* Gallery Images Upload */}
										<div className="form-group upload-section mt-2">
											<label>Upload 4 Images</label>
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
											{galleryImages.length > 0 &&
												renderPreviews(galleryImages, "gallery")}
										</div>

										{/* Video Upload */}
										<div className="form-group upload-section mt-2">
											<label>Upload Videos</label>
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
											{videos.length > 0 && renderPreviews(videos, "videos")}
										</div>

										{/* Submit */}
										<div className="submit_profile_btn position-relative">
											<button
												type="submit"
												className="mt-2 border text-start submit_signup_btn"
											>
												Sign up
											</button>
											<div className="profile_img">
												<img src={right_arrow} alt="" />
											</div>
										</div>
									</form>
								</div>
							</div>

							<div className="col-md-6">
								<div className="user_img1">
									<img
										src={imgregistaionfemale}
										className="img-fluid"
										alt="female"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* Modal with Packages */}
			<Modal
				isOpen={isModalOpen}
				onRequestClose={() => setIsModalOpen(false)}
				className="modal-content wrapper-model-dd"
				overlayClassName="modal-overlay"
			>
				<button
					type="button"
					onClick={() => {
						setIsModalOpen(false);
						setIsSecondModalOpen(true);
					}}
					className="position-absolute top-0 end-0 m-3 bg-danger text-white border-0 rounded-circle"
					style={{ width: 30, height: 30 }}
				>
					<i class="fa-solid fa-xmark text-white"></i>
				</button>
				<section className="pack_sec py-5">
					<div className="container">
						<div className="row justify-content-center">
							<div className="col-md-4">
								<div className="package_card px-2 py-2 bg-white rounded">
									<div className="">
										<h5 className="dark-color secondary-secondbold-font level-6">
											Verify with a selfie
										</h5>
										<p className="dark-color secondary-secondregular-font">
											Unlock The Door values authenticity. Together, we can
											maintain a safe dating community.
										</p>
									</div>
									<div className="p-2">
										<h5 className="dark-color secondary-secondbold-font">
											100% Confidential
										</h5>
										<p className="dark-color secondary-secondregular-font">
											Your selfie remains private. No one will be able to view
											it on your profile
										</p>
									</div>
									<div className="p-2">
										<h5 className="dark-color secondary-secondbold-font">
											Show You're Real
										</h5>
										<p className="dark-color secondary-secondregular-font">
											Let others know it's really you in your photos
										</p>
									</div>
									<div className="p-2">
										<h5 className="dark-color secondary-secondbold-font">
											Keep Seeking Secure
										</h5>
										<p className="dark-color secondary-secondregular-font">
											Create a safer environment for members to interact and
											meet offline
										</p>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</Modal>
			{/* Modal with Packages */}
			<Modal
				isOpen={isSecondModalOpen}
				onRequestClose={() => setIsSecondModalOpen(false)}
				className="modal-content wrapper-model-dd"
				overlayClassName="modal-overlay"
			>
				<section className="pack_sec py-5">
					<div className="container">
						<div className="row justify-content-center">
							{packages.map((pack, idx) => (
								<div className="col-md-4" key={idx}>
									<div className="package_card px-3 py-4 main_bg rounded">
										<div className="pack_heading text-center px-3 border-bottom py-3 border-white">
											<h3 className="text-white font_semibold font_level3">
												{pack.title}
											</h3>
											<p className="text-white secondary-secondregular-font">
												{pack.price}
											</p>
										</div>
										<ul className="ps-0 py-3">
											{pack.features.map((f, i) => (
												<li
													key={i}
													className="bullet_Wrapper wrapper-bullet py-2"
												>
													<div className="d-flex align-items-start gap-2 text-white">
														<img src={tick} alt="tick" style={{ width: 20 }} />
														<span>{f}</span>
													</div>
												</li>
											))}
										</ul>
										<div className="pack_btn d-flex justify-content-center">
											<Link to="/man-subscription">
												<button className="btn rounded-pill py-3 px-4 bg-white font_reg text-capitalize font_level4">
													Get Started
												</button>
											</Link>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				</section>
			</Modal>
		</>
	);
};

export default Stepthree;
