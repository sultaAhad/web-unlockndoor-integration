import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";
import {
	handsomeman,
	innerpages2,
	right_arrow,
	uploader_icon,
} from "../../Constant/Index";

Modal.setAppElement("#root");

const StepThree = ({
	formData,
	setFormData,
	handleSubmit,
	prev,
	formErrors,
	submitting,
}) => {
	const handleFileChange = (e, type) => {
		const files = Array.from(e.target.files);
		switch (type) {
			case "cover":
				setFormData({ ...formData, cover_images: files[0] });
				break;
			case "images":
				setFormData({ ...formData, images: [...formData.images, ...files] });
				break;
			case "videos":
				setFormData({ ...formData, videos: [...formData.videos, ...files] });
				break;
			default:
				break;
		}
	};

	const removeFile = (index, type) => {
		switch (type) {
			case "cover":
				setFormData({ ...formData, cover_images: null });
				break;
			case "images":
				setFormData({
					...formData,
					images: formData.images.filter((_, i) => i !== index),
				});
				break;
			case "videos":
				setFormData({
					...formData,
					videos: formData.videos.filter((_, i) => i !== index),
				});
				break;
			default:
				break;
		}
	};

	useEffect(() => {
		document.body.style.backgroundImage = `url(${innerpages2})`;
		document.body.style.backgroundSize = "cover";
		document.body.style.backgroundPosition = "center";
		document.body.style.minHeight = "100vh";
		return () => {
			document.body.style.backgroundImage = "";
		};
	}, []);

	const renderPreviews = (files, type) =>
		files.map((file, idx) => {
			if (!file) return null;
			let src = "";

			if (file instanceof File) {
				src = URL.createObjectURL(file);
			} else if (typeof file === "string") {
				src = file;
			} else {
				return null;
			}

			return (
				<div
				className="mt-2"
					key={idx}
					style={{
						display: "inline-block",
						position: "relative",
						marginRight: "10px",
					}}
				>
					{type === "videos" ? (
						<video className="wrapper-img-video-beck" controls src={src} />
					) : (
						<img className="wrapper-img-video-beck" src={src} alt="preview" />
					)}
					<button
						type="button"
						style={{
							position: "absolute",
							top: 0,
							right: 0,
							background: "red",
							color: "#fff",
							border: "none",
							borderRadius: "50%",
							width: "20px",
							height: "20px",
						}}
						className="position-absolute d-flex align-items-center justify-content-center top-0 end-0 bg-danger text-white rounded-circle border-0"
						onClick={() => removeFile(idx, type)}
					>
						✖
					</button>
				</div>
			);
		});

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
										{/* Gallery Images Upload */}
										<div className="form-group upload-section mt-3">
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
													onChange={(e) => handleFileChange(e, "images")}
												/>
											</div>
											{formData.images.length > 0 &&
												renderPreviews(formData.images, "images")}
											{formErrors?.images && (
												<p className="text-danger">{formErrors.images[0]}</p>
											)}
										</div>
										<div className="col-lg-10">
											<label className="mt-1">
												Note :{" "}
												<span className="label_span">
													1 picture would be considered as the <br /> primary
												</span>
											</label>
										</div>

										{/* Video Upload */}
										<div className="form-group upload-section mt-3">
											<label>Introduction video at least 2</label>
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
											{formData.videos.length > 0 &&
												renderPreviews(formData.videos, "videos")}
											{formErrors?.videos && (
												<p className="text-danger">{formErrors.videos[0]}</p>
											)}
										</div>

										{/* Cover Photo Upload */}
										<div className="form-group upload-section mt-3">
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
											{formData.cover_images &&
												renderPreviews([formData.cover_images], "cover")}
											{formErrors?.cover_images && (
												<p className="text-danger">
													{formErrors.cover_images[0]}
												</p>
											)}
										</div>
										<div className="col-lg-10">
											<label className="mt-1">
												Note :{" "}
												<span className="label_span">
													Explain yourself as a person
												</span>
											</label>
										</div>

										{/* Buttons */}
										<div className="d-flex justify-content-between align-content-center mt-4 gap-3">
											<div className="submit_profile_btn position-relative d-flex align-items-center w-100">
												<button
													type="button"
													className="mt-2 w-100 border text-start submit_signup_btn"
													onClick={prev}
												>
													Previous
												</button>
												<div className="profile_img ms-2">
													<img src={right_arrow} alt="prev" />
												</div>
											</div>

											<div className="submit_profile_btn position-relative d-flex align-items-center w-100">
												<button
													type="submit"
													className="mt-2 w-100 border text-start submit_signup_btn"
													disabled={submitting}
												>
													{submitting ? "Submitting..." : "Next"}
												</button>
												<div className="profile_img ms-2">
													<img src={right_arrow} alt="next" />
												</div>
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
		</>
	);
};

export default StepThree;
