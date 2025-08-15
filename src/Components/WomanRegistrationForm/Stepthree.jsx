import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import {
	blacktick,
	contact,
	handsomeman,
	imgregistaionfemale,
	innerpages2,
	right_arrow,
	uploader_icon,
} from "../../Constant/Index";
import { Link } from "react-router-dom";
import PackageSelectionModal from "../PackageSelectionModal";

Modal.setAppElement("#root");

const Stepthree = ({ formData, setFormData }) => {
	const [text, setText] = useState("");
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [coverPhotos, setCoverPhotos] = useState([]); // ✅ multiple images
	const [videos, setVideos] = useState([]);
	const [galleryImages, setGalleryImages] = useState([]);
	const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		if (coverPhotos.length < 5) {
			toast.error("Please upload at least 5 cover photos");
			return;
		}
		if (videos.length < 2) {
			toast.error("Please upload at least 2 introduction videos");
			return;
		}
		toast.success("Form submitted successfully!");
		setTimeout(() => setIsModalOpen(true), 2000);
	};

	const handleFileChange = (e, type) => {
		const files = Array.from(e.target.files);
		switch (type) {
			case "cover":
				setCoverPhotos([...coverPhotos, ...files]);
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
				setCoverPhotos(coverPhotos.filter((_, i) => i !== index));
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
										{/* Cover Photos */}
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
													onChange={(e) => handleFileChange(e, "cover")}
												/>
											</div>
											{coverPhotos.length > 0 &&
												renderPreviews(coverPhotos, "cover")}
										</div>
										<div className="col-lg-10">
											<label className="mt-1">
												Note :{" "}
												<span className="label_span">
													1 picture would be considered as the <br /> primary
												</span>
											</label>
										</div>
										{/* Videos */}
										<div className="form-group upload-section mt-2">
											<label className="level-4">
												introduction video at least 2
											</label>
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
										{/* Gallery Images */}
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
													multiple
													className="uploader_file"
													onChange={(e) => handleFileChange(e, "gallery")}
												/>
											</div>
											{galleryImages.length > 0 &&
												renderPreviews(galleryImages, "gallery")}
										</div>
										<div className="col-lg-10">
											<label className="mt-1">
												Note :{" "}
												<span className="label_span">
													Explain yourself as a person
												</span>
											</label>
										</div>

										{/* Submit Button */}
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
									<img src={handsomeman} className="img-fluid" alt="man" />
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

			<PackageSelectionModal
				isOpen={isSecondModalOpen}
				onRequestClose={() => setIsSecondModalOpen(false)}
			/>
		</>
	);
};

export default Stepthree;
